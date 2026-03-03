import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import workoutImg from '../assets/workout.jpg';

const Hero = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [showLocation, setShowLocation] = useState(false);

    // Text Visibility State
    const [showText, setShowText] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Start text reveal after 3 seconds
        const timer = setTimeout(() => {
            setShowText(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="hero-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
                background: '#000',
                position: 'relative',
                overflow: 'hidden',
                userSelect: 'none'
            }}
        >
            {/* Video Background or Fallback Image */}
            {!videoError ? (
                <video
                    className="video-background"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setVideoError(true)}
                    src="/ataraxia_bg.mp4"
                />
            ) : (
                <img
                    src={workoutImg}
                    className="video-background"
                    alt="Fallback background"
                />
            )}
            <div className="hero-overlay" />

            <div style={{
                position: 'relative',
                zIndex: 5,
                width: '100%',
                padding: '0 var(--spacing-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h1
                    className={`hero-title-main ${showText ? 'visible' : ''}`}
                >
                    ATARAXIA
                </h1>

                {!showLocation ? (
                    <div className={`hero-content-reveal ${showText ? 'visible' : ''}`}>
                        <p
                            className="hero-subtitle"
                            style={{
                                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                            }}
                        >
                            Master your mind. Forge your body.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={() => navigate('/rules')}
                                style={{
                                    padding: '1rem 2.5rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    color: '#000',
                                    background: '#fff',
                                    borderRadius: 'var(--radius-full)',
                                    transition: 'transform 0.3s ease, background 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; e.target.style.background = 'var(--color-accent-primary)'; }}
                                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.background = '#fff'; }}
                            >
                                Start Journey
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        marginTop: 'var(--spacing-lg)',
                        animation: 'fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)'
                    }}>
                        <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-accent-primary)',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            marginBottom: 'var(--spacing-xs)'
                        }}>
                            Our Sanctuary
                        </div>
                        <div className="location-box">
                            양재동 92-9
                        </div>
                        <button
                            onClick={() => setShowLocation(false)}
                            style={{
                                marginTop: 'var(--spacing-xl)',
                                color: '#888',
                                fontSize: '1rem',
                                borderBottom: '1px solid #444',
                                paddingBottom: '4px',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#888'; e.target.style.borderColor = '#444'; }}
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
