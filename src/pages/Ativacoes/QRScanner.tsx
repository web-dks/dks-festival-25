import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { supabase } from '../../lib/supabase';
import type { TipoAtivacao, ResultadoScan } from './index';

interface CameraDevice {
  id: string;
  label: string;
}

interface QRScannerProps {
  tipoAtivacao: TipoAtivacao;
  onResultado: (resultado: ResultadoScan) => void;
  onVoltar: () => void;
}

export function QRScanner({ tipoAtivacao, onResultado, onVoltar }: QRScannerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const processandoRef = useRef(false);

  const tipoLabel = tipoAtivacao === 'dados' ? 'Jogo de Dados' : 'Quebra-Cabeça';
  const tipoIcon = tipoAtivacao === 'dados' ? '🎲' : '🧩';

  const processarQRCodeCallback = useCallback(async (uuid: string) => {
    if (processandoRef.current) return;
    processandoRef.current = true;
    setProcessando(true);
    
    // Validar se parece ser um UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) {
      setErro('QR Code inválido. Por favor, escaneie um QR Code válido.');
      processandoRef.current = false;
      setProcessando(false);
      return;
    }
    
    // Parar o scanner de forma segura
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
          await scannerRef.current.stop();
        }
      } catch {
        // Scanner já parado
      }
    }

    try {
      // Buscar participante no banco
      const { data: participante, error: fetchError } = await supabase
        .from('participantes_dksfestival')
        .select('*')
        .eq('uuid', uuid)
        .single();

      if (fetchError || !participante) {
        onResultado({
          participante: { uuid, primeiro_nome: 'Desconhecido' },
          podeJogar: false,
          mensagem: 'Participante não encontrado no sistema.',
        });
        return;
      }

      // Verificar se já jogou essa ativação
      const campoVerificacao = tipoAtivacao === 'dados' ? 'jogou_jogo_dados' : 'jogou_quebra_cabeca';
      const jaJogou = participante[campoVerificacao];

      if (jaJogou) {
        onResultado({
          participante: { uuid: participante.uuid, primeiro_nome: participante.primeiro_nome },
          podeJogar: false,
          mensagem: `${participante.primeiro_nome} já participou do ${tipoLabel}.`,
        });
        return;
      }

      // Marcar como jogou no banco
      const { error: updateError } = await supabase
        .from('participantes_dksfestival')
        .update({ [campoVerificacao]: true })
        .eq('uuid', uuid);

      if (updateError) {
        console.error('Erro ao atualizar:', updateError);
        onResultado({
          participante: { uuid: participante.uuid, primeiro_nome: participante.primeiro_nome },
          podeJogar: false,
          mensagem: 'Erro ao registrar participação. Tente novamente.',
        });
        return;
      }

      // Sucesso!
      onResultado({
        participante: { uuid: participante.uuid, primeiro_nome: participante.primeiro_nome },
        podeJogar: true,
        mensagem: `${participante.primeiro_nome} pode jogar!`,
      });

    } catch (err) {
      console.error('Erro ao processar QR Code:', err);
      onResultado({
        participante: { uuid, primeiro_nome: 'Erro' },
        podeJogar: false,
        mensagem: 'Erro ao processar. Tente novamente.',
      });
    }
  }, [tipoAtivacao, tipoLabel, onResultado]);

  // Listar câmeras disponíveis
  useEffect(() => {
    const listarCameras = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length > 0) {
          const cameraList = devices.map((device) => ({
            id: device.id,
            label: device.label || `Câmera ${device.id.slice(0, 8)}`,
          }));
          setCameras(cameraList);
          
          // Preferir câmera traseira (environment) por padrão
          const backCamera = cameraList.find(
            (cam) => cam.label.toLowerCase().includes('back') || 
                     cam.label.toLowerCase().includes('traseira') ||
                     cam.label.toLowerCase().includes('rear') ||
                     cam.label.toLowerCase().includes('environment')
          );
          setSelectedCamera(backCamera?.id || cameraList[0].id);
        } else {
          setErro('Nenhuma câmera encontrada. Verifique se seu dispositivo possui câmera.');
          setIsLoading(false);
        }
      } catch (err: unknown) {
        console.error('Erro ao listar câmeras:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
          setErro('Permissão de câmera negada. Por favor, permita o acesso à câmera nas configurações do navegador.');
        } else {
          setErro('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
        }
        setIsLoading(false);
      }
    };

    listarCameras();
  }, []);

  // Iniciar scanner quando câmera for selecionada
  useEffect(() => {
    if (!selectedCamera || erro) return;
    
    let mounted = true;
    
    const iniciarScanner = async () => {
      try {
        // Para scanner anterior se existir
        if (scannerRef.current) {
          try {
            const state = scannerRef.current.getState();
            if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
              await scannerRef.current.stop();
            }
          } catch {
            // Ignora
          }
        }

        // Aguarda o elemento estar no DOM
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const element = document.getElementById('qr-reader');
        if (!element || !mounted) return;
        
        const html5QrCode = new Html5Qrcode('qr-reader');
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          selectedCamera,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            processarQRCodeCallback(decodedText);
          },
          () => {
            // QR code not found - silently continue scanning
          }
        );

        if (mounted) {
          setIsLoading(false);
        }
      } catch (err: unknown) {
        console.error('Erro ao iniciar scanner:', err);
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
            setErro('Permissão de câmera negada. Por favor, permita o acesso à câmera nas configurações do navegador.');
          } else if (errorMessage.includes('NotFoundError') || errorMessage.includes('no camera')) {
            setErro('Nenhuma câmera encontrada. Verifique se seu dispositivo possui câmera.');
          } else {
            setErro('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
          }
          setIsLoading(false);
        }
      }
    };

    iniciarScanner();

    return () => {
      mounted = false;
      if (scannerRef.current) {
        try {
          const state = scannerRef.current.getState();
          if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
            scannerRef.current.stop().catch(() => {});
          }
        } catch {
          // Ignora erros ao parar scanner já parado
        }
      }
    };
  }, [selectedCamera, erro, processarQRCodeCallback]);

  const handleCameraChange = async (newCameraId: string) => {
    setIsLoading(true);
    setSelectedCamera(newCameraId);
  };

  return (
    <div className="scanner-container">
      <div className="scanner-info">
        <h2>Escaneie o QR Code do participante</h2>
        <div className="scanner-tipo">
          <span>{tipoIcon}</span>
          <span>{tipoLabel}</span>
        </div>
      </div>

      {/* Seletor de câmera */}
      {cameras.length > 1 && !erro && (
        <div className="camera-selector">
          <label htmlFor="camera-select">📷 Câmera:</label>
          <select
            id="camera-select"
            value={selectedCamera}
            onChange={(e) => handleCameraChange(e.target.value)}
            disabled={isLoading || processando}
          >
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span className="loading-text">Iniciando câmera...</span>
        </div>
      )}

      {erro && (
        <div className="erro-container">
          <span className="erro-texto">{erro}</span>
          <button className="btn-primario" onClick={onVoltar}>
            Voltar
          </button>
        </div>
      )}

      <div 
        className="scanner-area" 
        style={{ display: isLoading || erro ? 'none' : 'block' }}
      >
        <div id="qr-reader" />
        <div className="scanner-overlay">
          <div className="scanner-corner top-left" />
          <div className="scanner-corner top-right" />
          <div className="scanner-corner bottom-left" />
          <div className="scanner-corner bottom-right" />
          <div className="scanner-line" />
        </div>
      </div>

      {processando && (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span className="loading-text">Verificando participante...</span>
        </div>
      )}

      {!erro && !processando && (
        <button className="btn-voltar" onClick={onVoltar}>
          ← Voltar
        </button>
      )}
    </div>
  );
}

