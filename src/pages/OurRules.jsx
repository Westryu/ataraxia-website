import React, { useEffect, useState } from 'react';

const rules = [
    { id: 'I', text: '게으름과 신뢰를 잃는 것만큼은 절대 피해야 합니다.' },
    { id: 'II', text: '대중을 모방하는 것은 평균으로의 회귀를 유도합니다.' },
    { id: 'III', text: '내가 사지 않을 물건은 팔지 않습니다.' },
    { id: 'IV', text: '세상이 당신에게 무엇을 줄지를 바라기 전에 그것을 받을 자격이 있는지를 먼저 생각하세요.' },
    { id: 'V', text: '나쁜 습관을 고치는 것보다 나쁜 습관을 피하는 것이 더 쉽습니다.' },
    { id: 'VI', text: '의지를 믿지 마세요. 환경에 집착하세요.' },
    { id: 'VII', text: '독립성을 최적화합니다.' },
    { id: 'VIII', text: '자신이 가장 잘하는 것을 찾아 두드리세요. 영원히.' },
    { id: 'IX', text: '본성을 따르세요. 모든 사람에게 사랑받을 필요는 없습니다.' },
    { id: 'X', text: '인생은 불공정합니다. 중요한 건 당신이 어떻게 반응하느냐입니다.' },
    { id: 'XI', text: '이끌거나, 따르거나, 떠나세요.' }
];

const OurRules = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="page-container" style={{ background: '#000', color: '#fff' }}>
            <h1
                className="page-title"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    marginBottom: '4rem'
                }}
            >
                ATARAXIA 11 RULES
            </h1>

            <div style={{
                maxWidth: '900px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '0 1rem'
            }}>
                {rules.map((rule, index) => (
                    <div
                        key={rule.id}
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '1.5rem',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                            transition: `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.3 + index * 0.1}s`,
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingBottom: '1.5rem'
                        }}
                    >
                        <span style={{
                            fontSize: '1.8rem',
                            fontFamily: 'serif',
                            minWidth: '60px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: '700',
                            fontStyle: 'italic',
                            textAlign: 'right'
                        }}>
                            {rule.id}
                        </span>
                        <p style={{
                            fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                            lineHeight: '1.6',
                            fontWeight: '400',
                            letterSpacing: '0.02em',
                            wordBreak: 'keep-all'
                        }}>
                            {rule.text}
                        </p>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '6rem',
                opacity: isVisible ? 0.3 : 0,
                transition: 'opacity 2s ease 2s',
                textAlign: 'center',
                letterSpacing: '0.5em',
                fontSize: '0.8rem'
            }}>
                MEMENTO MORI
            </div>
        </div>
    );
};

export default OurRules;
