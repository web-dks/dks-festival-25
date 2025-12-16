import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { getLineupByStage, getStageTimeRange, stages, lineupData } from '../data/lineup';
import type { LineupItem } from '../data/lineup';
import { LineupCard } from './LineupCard';
import { StageTabs } from './StageTabs';
import './VerticalTimeline.css';

// Função para obter horário atual de Brasília
function getBrasiliaTime(): Date {
  const now = new Date();
  // Converte para horário de Brasília (UTC-3)
  const brasiliaOffset = -3 * 60; // -3 horas em minutos
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (brasiliaOffset * 60000));
}

// Data do evento (19/12/2025)
const EVENT_DATE = '2025-12-19';

// Função para verificar se é o dia do evento
function isEventDay(): boolean {
  const currentTime = getBrasiliaTime();
  const currentDateStr = currentTime.toISOString().split('T')[0];
  return currentDateStr === EVENT_DATE;
}

// Função para encontrar o evento atual em todo o lineup
function findCurrentEvent(): { item: LineupItem; stage: 'horta' | 'palco' } | null {
  if (!isEventDay()) return null;
  
  const currentTime = getBrasiliaTime();
  
  for (const item of lineupData) {
    const since = new Date(item.since);
    const till = new Date(item.till);
    
    if (currentTime >= since && currentTime < till) {
      return { item, stage: item.stage };
    }
  }
  
  return null;
}

// Hook para determinar o status de cada atração
function useLineupStatus(items: LineupItem[]) {
  return useMemo(() => {
    const currentTime = getBrasiliaTime();
    
    // Verificar se estamos no dia do evento
    if (!isEventDay()) {
      return items.map(item => ({ item, status: 'upcoming' as const }));
    }
    
    let currentIndex = -1;
    
    // Primeiro, encontrar o índice da atração atual
    for (let i = 0; i < items.length; i++) {
      const since = new Date(items[i].since);
      const till = new Date(items[i].till);
      
      if (currentTime >= since && currentTime < till) {
        currentIndex = i;
        break;
      }
    }
    
    // Se não encontrou atração atual, verificar se estamos antes do evento
    if (currentIndex === -1) {
      const firstSince = items.length > 0 ? new Date(items[0].since) : new Date();
      if (currentTime < firstSince) {
        // Antes do evento começar, primeiro item é "next"
        return items.map((item, index) => ({
          item,
          status: index === 0 ? 'next' as const : 'upcoming' as const
        }));
      }
      // Após o evento, todos são "past"
      return items.map(item => ({ item, status: 'past' as const }));
    }
    
    // Mapear status baseado no índice atual
    return items.map((item, index) => {
      if (index < currentIndex) {
        return { item, status: 'past' as const };
      } else if (index === currentIndex) {
        return { item, status: 'current' as const };
      } else if (index === currentIndex + 1) {
        return { item, status: 'next' as const };
      }
      return { item, status: 'upcoming' as const };
    });
  }, [items]);
}

export function VerticalTimeline() {
  const [activeStage, setActiveStage] = useState<'horta' | 'palco'>('horta');
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const currentCardRef = useRef<HTMLDivElement>(null);
  
  const stageItems = useMemo(() => getLineupByStage(activeStage), [activeStage]);
  const itemsWithStatus = useLineupStatus(stageItems);
  const timeRange = useMemo(() => getStageTimeRange(activeStage), [activeStage]);
  
  const currentStage = stages.find(s => s.id === activeStage);

  // Efeito para mudar automaticamente para a aba com o evento atual
  useEffect(() => {
    const currentEvent = findCurrentEvent();
    if (currentEvent && currentEvent.stage !== activeStage) {
      setActiveStage(currentEvent.stage);
    }
  }, []); // Executa apenas na montagem inicial

  // Efeito para fazer scroll até o card atual
  useEffect(() => {
    if (!hasAutoScrolled && currentCardRef.current) {
      // Aguarda a animação do card terminar antes de fazer scroll
      const timer = setTimeout(() => {
        currentCardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        setHasAutoScrolled(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [itemsWithStatus, hasAutoScrolled]);

  // Atualiza a cada minuto para verificar mudanças de horário
  useEffect(() => {
    const interval = setInterval(() => {
      const currentEvent = findCurrentEvent();
      if (currentEvent && currentEvent.stage !== activeStage) {
        setActiveStage(currentEvent.stage);
        setHasAutoScrolled(false); // Permite novo scroll ao mudar de aba
      }
    }, 60000); // Verifica a cada 1 minuto
    
    return () => clearInterval(interval);
  }, [activeStage]);

  // Callback para ref do card atual
  const setCurrentRef = useCallback((node: HTMLDivElement | null, status: string) => {
    if (status === 'current' && node) {
      (currentCardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, []);

  return (
    <section className="vertical-timeline">
      <div className="timeline-header">
        <h2 className="timeline-title">PROGRAMAÇÃO</h2>
        
        <StageTabs 
          activeStage={activeStage} 
          onStageChange={(stage) => {
            setActiveStage(stage);
            setHasAutoScrolled(true); // Não faz auto-scroll quando usuário muda manualmente
          }} 
        />
        
        {currentStage?.subtitle && (
          <p className="timeline-subtitle">{currentStage.subtitle}</p>
        )}
        
        <div className="timeline-duration">
          <span className="duration-icon">⏱</span>
          <span className="duration-text">{timeRange}</span>
        </div>
      </div>
      
      <div className="timeline-container">
        <div className="timeline-items" key={activeStage}>
          {itemsWithStatus.map(({ item, status }, index) => (
            <LineupCard 
              key={item.id} 
              item={item} 
              status={status}
              index={index}
              ref={(node) => setCurrentRef(node, status)}
            />
          ))}
        </div>
      </div>
      
      <div className="timeline-footer">
        <p className="footer-note">
          * Horários sujeitos a alterações
        </p>
      </div>
    </section>
  );
}
