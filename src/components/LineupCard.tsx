import { forwardRef } from 'react';
import type { LineupItem } from '../data/lineup';
import './LineupCard.css';

interface LineupCardProps {
  item: LineupItem;
  status: 'past' | 'current' | 'next' | 'upcoming';
  index: number;
}

export const LineupCard = forwardRef<HTMLDivElement, LineupCardProps>(function LineupCard({ item, status, index }, ref) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DJ':
        return 'category-dj';
      case 'Banda':
        return 'category-banda';
      case 'Samba':
        return 'category-samba';
      case 'Talk':
        return 'category-talk';
      case 'Coffee':
        return 'category-coffee';
      case 'Bar':
        return 'category-bar';
      case 'Transição':
        return 'category-transicao';
      case 'Retrospectiva':
        return 'category-retrospectiva';
      case 'Quiz':
        return 'category-quiz';
      case 'Encerramento':
        return 'category-encerramento';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={ref}
      className={`lineup-card ${status} animate-slide-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Status Badge */}
      {status === 'current' && (
        <div className="status-badge current-badge">
          <span className="pulse-dot"></span>
          AGORA
        </div>
      )}
      {status === 'next' && (
        <div className="status-badge next-badge">
          EM SEGUIDA
        </div>
      )}
      
      {/* Timeline connector */}
      <div className="timeline-connector">
        <div className="timeline-line top"></div>
        <div className={`timeline-dot ${status}`}></div>
        <div className="timeline-line bottom"></div>
      </div>
      
      {/* Card Content */}
      <div className="card-content">
        {/* Time */}
        <div className="card-time">
          <span className="time-start">{formatTime(item.since)}</span>
          {item.since !== item.till && (
            <>
              <span className="time-separator">—</span>
              <span className="time-end">{formatTime(item.till)}</span>
            </>
          )}
        </div>
        
        {/* Category */}
        <div className={`card-category ${getCategoryColor(item.category)}`}>
          {item.category.toUpperCase()}
        </div>
        
        {/* Title */}
        <h3 className="card-title">{item.title}</h3>
        
        {/* Description */}
        {item.description && (
          <p className="card-description">{item.description}</p>
        )}
      </div>
    </div>
  );
});

