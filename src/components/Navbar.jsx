import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'OUR JOURNEY', path: '/journey' },
        { name: 'RULES', path: '/rules' },
        { name: 'LOCATION', path: '/location' },
        { name: 'GALLERY', path: '/gallery' },
        { name: 'WOD', path: '/wod' }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1.2rem var(--spacing-md)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{
                fontSize: '1.2rem',
                fontWeight: '900',
                color: '#fff',
                letterSpacing: '0.1rem',
                textDecoration: 'none',
                zIndex: 1001
            }}>
                ATARAXIA
            </Link>

            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    width: '30px',
                    height: '24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    zIndex: 1001
                }}
                className="hamburger"
            >
                <div style={{
                    width: '100%',
                    height: '2px',
                    background: '#fff',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'
                }} />
                <div style={{
                    width: '100%',
                    height: '2px',
                    background: '#fff',
                    transition: 'all 0.3s ease',
                    opacity: isMenuOpen ? 0 : 1
                }} />
                <div style={{
                    width: '100%',
                    height: '2px',
                    background: '#fff',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'
                }} />
            </button>

            {/* Desktop & Mobile Menu */}
            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            color: location.pathname === item.path ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                            fontWeight: '600',
                            fontSize: '0.75rem',
                            letterSpacing: '0.05rem',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                            position: 'relative'
                        }}
                    >
                        {item.name}
                        {location.pathname === item.path && (
                            <div className="active-indicator" style={{
                                position: 'absolute',
                                bottom: '-5px',
                                left: 0,
                                width: '100%',
                                height: '2px',
                                background: 'var(--color-accent-primary)',
                                animation: 'scaleIn 0.3s ease-out'
                            }} />
                        )}
                    </Link>
                ))}
            </div>

            <style>{`
        .nav-links {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            transform: translateY(-100%);
            transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
            z-index: 1000;
        }

        .nav-links.open {
            transform: translateY(0);
        }

        .nav-links a {
            font-size: 1.5rem !important;
            letter-spacing: 0.2rem !important;
        }

        .hamburger {
            display: flex !important;
        }

        @media (min-width: 768px) {
          nav {
            padding: 1.5rem var(--spacing-lg) !important;
          }
          
          .hamburger {
            display: none !important;
          }

          .nav-links {
            position: static;
            height: auto;
            width: auto;
            background: transparent;
            flex-direction: row;
            transform: none;
            gap: var(--spacing-lg);
            z-index: auto;
          }

          .nav-links a {
            font-size: 0.9rem !important;
            letter-spacing: 0.1rem !important;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
