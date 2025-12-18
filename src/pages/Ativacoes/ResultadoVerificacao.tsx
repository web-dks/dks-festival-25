import type { TipoAtivacao, ResultadoScan } from './index';

interface ResultadoVerificacaoProps {
  resultado: ResultadoScan;
  tipoAtivacao: TipoAtivacao;
  onNovoScan: () => void;
  onVoltar: () => void;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ResultadoVerificacao({ resultado, tipoAtivacao, onNovoScan, onVoltar }: ResultadoVerificacaoProps) {
  const tipoLabel = tipoAtivacao === 'dados' ? 'Jogo de Dados' : 'Quebra-Cabeça';
  const tipoIcon = tipoAtivacao === 'dados' ? '🎲' : '🧩';

  return (
    <div className="resultado-container">
      <div className={`resultado-icone ${resultado.podeJogar ? 'sucesso' : 'erro'}`}>
        {resultado.podeJogar ? <CheckIcon /> : <XIcon />}
      </div>

      <div className="resultado-info">
        <h2 className="resultado-nome">{resultado.participante.primeiro_nome}</h2>
        <p className={`resultado-mensagem ${resultado.podeJogar ? 'sucesso' : 'erro'}`}>
          {resultado.mensagem}
        </p>
      </div>

      <div className="scanner-tipo">
        <span>{tipoIcon}</span>
        <span>{tipoLabel}</span>
      </div>

      <div className="resultado-acoes">
        <button className="btn-primario" onClick={onNovoScan}>
          Escanear Próximo
        </button>
        <button className="btn-voltar" onClick={onVoltar}>
          ← Trocar Ativação
        </button>
      </div>
    </div>
  );
}

