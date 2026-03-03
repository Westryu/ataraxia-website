import React, { useEffect, useState } from 'react';

const OurJourney = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="page-container">
            <h1
                className="page-title"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            >
                OUR JOURNEY
            </h1>

            <div
                className="content-wrapper"
                style={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.8',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s'
                }}
            >
                <p>
                    Ataraxia was born from a simple realization: physical strength is meaningless without mental clarity.
                    Our journey began in the heart of Yangjae-dong, where we sought to create a sanctuary for those
                    who demand more from their training.
                </p>
                <p>
                    We don't just build muscles; we cultivate a state of serene calmness amidst the most intense physical challenges.
                    Every session is a step towards self-mastery.
                </p>

                <div style={{
                    marginTop: 'var(--spacing-lg)',
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3 style={{ color: 'var(--color-accent-primary)', marginBottom: '0.5rem' }}>The Vision</h3>
                    <p style={{ fontStyle: 'italic', fontSize: '1rem' }}>
                        "To provide a premium environment where high-performance individuals can push their limits and find their center."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OurJourney;
