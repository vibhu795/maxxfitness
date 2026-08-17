import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Navbar({ currentRoute, setCurrentRoute, isLoggedIn, setIsLoggedIn, togglePortal, language, setLanguage, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('home'), id: 'home' },
    { label: t('programs'), id: 'programs' },
    { label: t('nutrition'), id: 'nutrition' },
    { label: t('coaching'), id: 'coaching' },
    { label: t('plans'), id: 'plans' },
    { label: t('about'), id: 'about' }
  ];

  const handleNavClick = (id) => {
    setCurrentRoute(id);
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <span className="logo-maxx">MAXX</span>
          <span className="logo-fit">FIT CLUB</span>
        </div>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-link-btn ${currentRoute === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Sleek Language Switcher Switch */}
          <div className="language-switch">
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${language === 'gr' ? 'active' : ''}`}
              onClick={() => setLanguage('gr')}
            >
              GR
            </button>
          </div>

          {isLoggedIn ? (
            <button className="btn btn-secondary btn-portal-toggle" onClick={togglePortal}>
              <User size={18} className="icon-yellow" />
              <span>{t('portalDashboard')}</span>
            </button>
          ) : (
            <>
              <button className="nav-login-btn" onClick={togglePortal}>
                {t('login')}
              </button>
              <button className="btn btn-primary btn-nav-join" onClick={() => handleNavClick('plans')}>
                {t('joinNow')}
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="mobile-toggle-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-dropdown animate-fade">
          <ul className="mobile-links-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`mobile-link-btn ${currentRoute === link.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="mobile-actions-row">
              {/* Mobile Language Switcher Switch */}
              <div className="language-switch mobile-lang-switch">
                <button 
                  className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button 
                  className={`lang-btn ${language === 'gr' ? 'active' : ''}`}
                  onClick={() => setLanguage('gr')}
                >
                  GR
                </button>
              </div>

              {isLoggedIn ? (
                <button className="btn btn-secondary w-full" onClick={togglePortal}>
                  <User size={18} className="icon-yellow" />
                  <span>{t('portalDashboard')}</span>
                </button>
              ) : (
                <div className="mobile-auth-buttons">
                  <button className="nav-login-btn" onClick={togglePortal}>
                    {t('login')}
                  </button>
                  <button className="btn btn-primary" onClick={() => handleNavClick('plans')}>
                    {t('joinNow')}
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Inline styles for Navbar to keep components clean and independent */}
      <style dangerouslySetInnerHTML={{ __html: `
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
          padding: 20px 0;
        }

        /* Sleek Language Switcher switch */
        .language-switch {
          display: inline-flex;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          padding: 3px;
          border-radius: var(--radius-pill);
          align-items: center;
          margin-right: 16px;
        }

        .language-switch.mobile-lang-switch {
          margin-right: 0;
          margin-bottom: 16px;
          width: 100%;
          justify-content: center;
        }

        .lang-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 750;
          cursor: pointer;
          border-radius: var(--radius-pill);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lang-btn:hover {
          color: var(--text-primary);
        }

        .lang-btn.active {
          background-color: var(--bg-active);
          color: var(--color-accent);
        }
        
        .navbar.scrolled {
          background: rgba(13, 13, 13, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--color-border);
          padding: 14px 0;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
        }

        .logo-maxx {
          color: var(--color-accent);
        }

        .logo-fit {
          color: var(--text-primary);
        }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 32px;
          align-items: center;
        }

        .nav-link-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          padding: 6px 0;
        }

        .nav-link-btn:hover {
          color: var(--text-primary);
        }

        .nav-link-btn.active {
          color: var(--color-accent);
          font-weight: 600;
        }

        .nav-link-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--color-accent);
          border-radius: var(--radius-pill);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-login-btn {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .nav-login-btn:hover {
          color: var(--color-accent);
        }

        .btn-nav-join {
          padding: 10px 24px;
          font-size: 0.95rem;
        }

        .btn-portal-toggle {
          padding: 10px 20px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon-yellow {
          color: var(--color-accent);
        }

        .mobile-toggle-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Mobile Dropdown Styles */
        .mobile-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #0D0D0D;
          border-bottom: 1px solid var(--color-border);
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        }

        .mobile-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .mobile-link-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1.1rem;
          font-weight: 600;
          width: 100%;
          text-align: left;
          cursor: pointer;
          padding: 8px 0;
          transition: color 0.2s ease;
        }

        .mobile-link-btn:hover, .mobile-link-btn.active {
          color: var(--color-accent);
        }

        .mobile-actions-row {
          margin-top: 10px;
          border-top: 1px solid var(--color-border);
          padding-top: 20px;
        }

        .mobile-auth-buttons {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .mobile-auth-buttons .btn {
          flex: 1;
        }

        @media (max-width: 900px) {
          .navbar-links, .navbar-actions {
            display: none;
          }
          .mobile-toggle-btn {
            display: block;
          }
        }
      `}} />
    </nav>
  );
}
