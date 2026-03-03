import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import workoutImg from '../assets/workout.jpg';

const Hero = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isJourneyActive, setIsJourneyActive] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const [showText, setShowText] = useState(false);
    const [videoError, setVideoError] = useState(false);

    const videoRefs = {
        LAND: useRef(null),
        SKY: useRef(null),
        SEA: useRef(null)
    };

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => setShowText(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleStartJourney = () => {
        setIsJourneyActive(true);
        setShowText(false);
    };

    const handleSectionHover = (section, isHovering) => {
        if (expandedSection) return;
        const video = videoRefs[section].current;
        if (video) {
            if (isHovering) {
                video.play().catch(() => { });
            } else {
                video.pause();
            }
        }
    };

    const handleSectionClick = (section) => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
            const video = videoRefs[section].current;
            if (video) video.play().catch(() => { });
        }
    };

    const sections = [
        { id: 'LAND', title: 'LAND', color: '#1a1a1a', video: '/rowing.mp4' },
        { id: 'SKY', title: 'SKY', color: '#0f172a', video: '/sky.mp4' },
        { id: 'SEA', title: 'SEA', color: '#020617', video: '/sea.mp4' }
    ];

    const handleBackToHome = () => {
        setIsJourneyActive(false);
        setExpandedSection(null);
        // Delay the text reappearing to match the entrance feel
        setTimeout(() => setShowText(true), 500);
    };

    if (isJourneyActive) {
        return (
            <div className="journey-hub-container fadeInUp" style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                background: '#000',
                zIndex: 2000,
                overflow: 'hidden'
            }}>
                {sections.map((s) => (
                    <div
                        key={s.id}
                        className={`journey-section ${expandedSection === s.id ? 'expanded' : ''} ${expandedSection && expandedSection !== s.id ? 'collapsed' : ''}`}
                        onMouseEnter={() => handleSectionHover(s.id, true)}
                        onMouseLeave={() => handleSectionHover(s.id, false)}
                        onClick={() => handleSectionClick(s.id)}
                        style={{
                            flex: expandedSection === s.id ? 10 : 1,
                            position: 'relative',
                            height: '100%',
                            transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            borderRight: s.id !== 'SEA' ? '1px solid rgba(255,255,255,0.1)' : 'none'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden'
                        }}>
                            <video
                                ref={videoRefs[s.id]}
                                src={s.video}
                                loop
                                muted
                                playsInline
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '110%', /* Increased height to allow cropping */
                                    top: '5%', /* Move down to hide top part */
                                    left: '0',
                                    objectFit: 'cover',
                                    opacity: expandedSection === s.id ? 1 : 0.6, /* Increased base opacity */
                                    filter: expandedSection === s.id ? 'brightness(1.1)' : 'grayscale(30%) blur(2px) brightness(0.8)', /* Dynamic filter */
                                    transition: 'all 0.8s ease',
                                    transform: 'scale(1.2)', /* Scale up to ensure coverage while cropping */
                                    objectPosition: 'center bottom' /* Prioritize bottom part */
                                }}
                            />
                        </div>

                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            background: expandedSection === s.id ? 'transparent' : 'rgba(0,0,0,0.3)', /* Lighter overlay */
                            transition: 'background 0.8s ease'
                        }}>
                            <h2 style={{
                                color: '#fff',
                                fontSize: expandedSection === s.id ? 'clamp(4rem, 15vw, 10rem)' : 'clamp(1.5rem, 5vw, 3rem)',
                                fontWeight: '900',
                                letterSpacing: '0.5em',
                                transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                transform: 'none', /* Removed rotation */
                                whiteSpace: 'nowrap',
                                textShadow: '0 0 20px rgba(0,0,0,0.5)'
                            }}>
                                {s.title}
                            </h2>

                            {expandedSection === s.id && (
                                <p
                                    className="fadeInUp"
                                    onClick={() => s.id === 'LAND' && navigate('/journey')}
                                    style={{
                                        marginTop: '2rem',
                                        color: 'var(--color-accent-primary)',
                                        letterSpacing: '0.4em',
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        cursor: s.id === 'LAND' ? 'pointer' : 'default',
                                        textDecoration: s.id === 'LAND' ? 'underline' : 'none',
                                        textUnderlineOffset: '8px'
                                    }}
                                >
                                    {s.id === 'LAND' ? 'EXPLORING THE SANCTUARY' : 'COMING SOON'}
                                </p>
                            )}
                        </div>

                        {expandedSection === s.id && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setExpandedSection(null); }}
                                style={{
                                    position: 'absolute',
                                    top: '40px',
                                    right: '40px',
                                    background: 'none',
                                    border: '1px solid #fff',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    zIndex: 100,
                                    borderRadius: 'var(--radius-full)'
                                }}
                            >
                                CLOSE
                            </button>
                        )}
                    </div>
                ))}

                <button
                    onClick={handleBackToHome}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        padding: '10px 30px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        cursor: 'pointer',
                        zIndex: 100,
                        opacity: expandedSection ? 0 : 1,
                        transition: 'opacity 0.5s ease'
                    }}
                >
                    BACK TO HOME
                </button>
            </div>
        );
    }

    return (
        <section className="hero-container" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            background: '#000',
            position: 'relative',
            overflow: 'hidden'
        }}>
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
                <img src={workoutImg} className="video-background" alt="Fallback" />
            )}
            <div className="hero-overlay" />

            <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
                <h1 className={`hero-title-main ${showText ? 'visible' : ''}`}>ATARAXIA</h1>
                <div className={`hero-content-reveal ${showText ? 'visible' : ''}`}>
                    <p className="hero-subtitle">Master your mind. Forge your body.</p>
                    <button
                        onClick={handleStartJourney}
                        style={{
                            padding: '1rem 3rem',
                            fontSize: '1.2rem',
                            fontWeight: '900',
                            color: '#000',
                            background: '#fff',
                            borderRadius: 'var(--radius-full)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            letterSpacing: '0.1em'
                        }}
                        onMouseEnter={(e) => { e.target.style.background = 'var(--color-accent-primary)'; e.target.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.transform = 'scale(1)'; }}
                    >
                        START JOURNEY
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
