import { useState } from 'react';
import { QRScanner } from './QRScanner';
import { ResultadoVerificacao } from './ResultadoVerificacao';
import './Ativacoes.css';

export type TipoAtivacao = 'dados' | 'quebra_cabeca';
export type EstadoTela = 'selecao' | 'scanner' | 'resultado';

export interface ResultadoScan {
  participante: {
    uuid: string;
    primeiro_nome: string;
  };
  podeJogar: boolean;
  mensagem: string;
}

export function Ativacoes() {
  const [tipoAtivacao, setTipoAtivacao] = useState<TipoAtivacao | null>(null);
  const [estadoTela, setEstadoTela] = useState<EstadoTela>('selecao');
  const [resultado, setResultado] = useState<ResultadoScan | null>(null);

  const handleSelecionarAtivacao = (tipo: TipoAtivacao) => {
    setTipoAtivacao(tipo);
    setEstadoTela('scanner');
  };

  const handleResultado = (res: ResultadoScan) => {
    setResultado(res);
    setEstadoTela('resultado');
  };

  const handleVoltar = () => {
    setEstadoTela('selecao');
    setTipoAtivacao(null);
    setResultado(null);
  };

  const handleNovoScan = () => {
    setResultado(null);
    setEstadoTela('scanner');
  };

  return (
    <div className="ativacoes-container">
      <div className="ativacoes-header">
        <img src="/logo-festival.svg" alt="DKS Festival" className="ativacoes-logo" />
        <h1>Controle de Ativações</h1>
      </div>

      {estadoTela === 'selecao' && (
        <div className="ativacoes-selecao">
          <h2>Qual ativação deseja verificar?</h2>
          <div className="ativacoes-botoes">
            <button 
              className="btn-ativacao btn-dados"
              onClick={() => handleSelecionarAtivacao('dados')}
            >
              <span className="btn-icon">🎲</span>
              <span className="btn-texto">Jogo de Dados</span>
            </button>
            <button 
              className="btn-ativacao btn-quebra-cabeca"
              onClick={() => handleSelecionarAtivacao('quebra_cabeca')}
            >
              <span className="btn-icon">🧩</span>
              <span className="btn-texto">Quebra-Cabeça</span>
            </button>
          </div>
        </div>
      )}

      {estadoTela === 'scanner' && tipoAtivacao && (
        <QRScanner 
          tipoAtivacao={tipoAtivacao} 
          onResultado={handleResultado}
          onVoltar={handleVoltar}
        />
      )}

      {estadoTela === 'resultado' && resultado && (
        <ResultadoVerificacao 
          resultado={resultado}
          tipoAtivacao={tipoAtivacao!}
          onNovoScan={handleNovoScan}
          onVoltar={handleVoltar}
        />
      )}
    </div>
  );
}

