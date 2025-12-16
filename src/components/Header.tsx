import { eventInfo } from '../data/lineup';
import logoFestival from '../assets/logo-festival.svg';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo oficial do DKS Festival 25 */}
        <div className="logo-container">
          <img 
            src={logoFestival} 
            alt="DKS Festival 25" 
            className="logo-image"
          />
        </div>
        
        {/* Informações do evento */}
        <div className="event-info">
          <div className="event-date">
            <span className="day-of-week">{eventInfo.dayOfWeek}</span>
            <span className="separator">•</span>
            <span className="date">{eventInfo.date}</span>
            <span className="separator">•</span>
            <span className="location">{eventInfo.location}</span>
          </div>
        </div>
        
        {/* Linha decorativa */}
        <div className="header-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
          <div className="decoration-line"></div>
        </div>
      </div>
    </header>
  );
}
