import React, { useEffect, useState } from 'react';
import rulesImg from '../assets/rules_image.jpg';

const OurRules = () => {
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
                RULES
            </h1>

            <div style={{
                maxWidth: '1000px',
                width: '100%',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s',
                display: 'flex',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}>
                <img
                    src={rulesImg}
                    alt="Ataraxia 11 Rules"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderBottomLeftRadius: 'var(--radius-md)',
                        borderBottomRightRadius: 'var(--radius-md)',
                        filter: 'brightness(1.1) contrast(1.1)'
                    }}
                />
            </div>
        </div>
    );
};

export default OurRules;
