import React from 'react';

export default function Footer({ setCurrentRoute }) {
  const handleNavClick = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo" onClick={() => handleNavClick('home')}>
            <span className="logo-maxx">MAXX</span>
            <span className="logo-fit">FIT CLUB</span>
          </div>
          <p className="footer-description">
             fall in love with fitness. Meet the stronger, faster, and more confident version of yourself.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon-btn" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-menu">
          <h4 className="footer-menu-title">Explore</h4>
          <ul className="footer-menu-links">
            <li><button onClick={() => handleNavClick('programs')}>Programs</button></li>
            <li><button onClick={() => handleNavClick('nutrition')}>Nutrition</button></li>
            <li><button onClick={() => handleNavClick('coaching')}>Coaching</button></li>
            <li><button onClick={() => handleNavClick('plans')}>Plans & Pricing</button></li>
            <li><button onClick={() => handleNavClick('about')}>About Us</button></li>
          </ul>
        </div>

        <div className="footer-download">
          <h4 className="footer-menu-title">Get The App</h4>
          <p className="download-text">Carry your coach, plans, and tracker in your pocket.</p>
          <div className="download-buttons">
            <a href="#" className="download-store-btn" aria-label="Download on the App Store">
              <span className="btn-store-icon"></span>
              <div className="btn-store-text">
                <span className="store-sub">Download on the</span>
                <span className="store-main">App Store</span>
              </div>
            </a>
            <a href="#" className="download-store-btn" aria-label="Get it on Google Play">
              <span className="btn-store-icon play-store-icon">▶</span>
              <div className="btn-store-text">
                <span className="store-sub">GET IT ON</span>
                <span className="store-main">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">&copy; {new Date().getFullYear()} Maxx Fit Club. All rights reserved.</p>
        <div className="footer-legal-links">
          <a href="#" className="legal-link">Terms & Conditions</a>
          <a href="#" className="legal-link">Privacy Policy</a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--color-border);
          padding: 80px 0 40px 0;
          margin-top: auto;
        }

        .footer-top {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 60px 24px;
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 60px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
        }

        .footer-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 320px;
          line-height: 1.5;
        }

        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-pill);
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .social-icon-btn:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
          transform: translateY(-2px);
        }

        .footer-menu {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-menu-title {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .footer-menu-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-menu-links button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: color 0.2s ease;
          text-align: left;
        }

        .footer-menu-links button:hover {
          color: var(--color-accent);
        }

        .footer-download {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .download-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .download-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .download-store-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #000000;
          border: 1px solid var(--color-border);
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          max-width: 200px;
        }

        .download-store-btn:hover {
          border-color: var(--color-accent);
          background: var(--bg-card);
          transform: translateY(-2px);
        }

        .btn-store-icon {
          font-size: 1.8rem;
          color: #FFFFFF;
          line-height: 1;
        }

        .play-store-icon {
          font-size: 1.2rem;
          color: var(--text-secondary);
          padding-left: 2px;
        }

        .download-store-btn:hover .play-store-icon {
          color: var(--color-accent);
        }

        .btn-store-text {
          display: flex;
          flex-direction: column;
        }

        .store-sub {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1;
          margin-bottom: 2px;
        }

        .store-main {
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.1;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 0 24px;
          border-top: 1px solid var(--color-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .copyright {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .footer-legal-links {
          display: flex;
          gap: 24px;
        }

        .legal-link {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .legal-link:hover {
          color: var(--color-accent);
        }

        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            padding-top: 30px;
          }
          .footer-legal-links {
            justify-content: center;
          }
        }
      `}} />
    </footer>
  );
}
