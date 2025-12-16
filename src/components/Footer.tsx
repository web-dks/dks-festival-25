import logoFestival from '../assets/logo-festival.svg';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
          <div className="decoration-line"></div>
        </div>
        
        <div className="footer-message">
          <p className="message-main">
            "CHEGAR NO COMEÇO FAZ PARTE DA EXPERIÊNCIA."
          </p>
          <p className="message-cta">
            NOS VEMOS SEXTA, <span className="highlight">9H EM PONTO</span>.
          </p>
        </div>
        
        <div className="footer-brand">
          <img 
            src={logoFestival} 
            alt="DKS Festival 25" 
            className="footer-logo"
          />
        </div>
        
        <div className="footer-social">
          <p className="social-text">SIGA @DKSFESTIVAL</p>
        </div>
      </div>
    </footer>
  );
}

