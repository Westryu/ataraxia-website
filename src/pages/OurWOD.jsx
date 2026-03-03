import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import '../index.css';

const OurWOD = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [wods, setWods] = useState({});

    // Fetch WODs from Supabase
    const fetchWods = async () => {
        setLoading(true);
        // Fetch all WODs for the current month/year to highlight calendar dates
        // For simplicity, we can fetch all or filter by year-month prefix
        const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

        const { data, error } = await supabase
            .from('wods')
            .select('*')
            .like('date', `${monthPrefix}-%`);

        if (error) {
            console.error('Error fetching WODs:', error);
        } else {
            const wodMap = {};
            data.forEach(wod => {
                wodMap[wod.date] = wod;
            });
            setWods(wodMap);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWods();
    }, [currentMonth, currentYear]);

    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    const currentWod = wods[dateKey];

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(prev => prev - 1);
        } else {
            setCurrentMonth(prev => prev - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(prev => prev + 1);
        } else {
            setCurrentMonth(prev => prev + 1);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        const { error } = await supabase
            .from('wods')
            .upsert({
                date: dateKey,
                details: editContent
            }, { onConflict: 'date' });

        if (error) {
            console.error('Error saving WOD:', error);
            alert('저장 중 오류가 발생했습니다.');
        } else {
            // Update local state
            setWods(prev => ({
                ...prev,
                [dateKey]: { date: dateKey, details: editContent }
            }));
            setIsEditing(false);
        }
        setLoading(false);
    };

    const startEditing = () => {
        setEditContent(currentWod ? currentWod.details : '');
        setIsEditing(true);
    };

    // Calendar logic
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
        <div className="page-container fadeInUp">
            <h1 className="page-title">WOD</h1>

            <div className="content-wrapper" style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1fr) 350px',
                gap: 'var(--spacing-xl)',
                alignItems: 'start',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.3s ease'
            }}>
                {/* Calendar Grid */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-lg)',
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        color: 'var(--color-accent-primary)',
                        letterSpacing: '0.1rem'
                    }}>
                        <button onClick={handlePrevMonth} className="nav-btn">{"<"}</button>
                        <span>{new Date(currentYear, currentMonth).toLocaleString('ko-KR', { month: 'long', year: 'numeric' })}</span>
                        <button onClick={handleNextMonth} className="nav-btn">{">"}</button>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '8px',
                        textAlign: 'center'
                    }}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} style={{ color: '#666', fontWeight: '700', fontSize: '0.8rem', marginBottom: '10px' }}>{d}</div>
                        ))}
                        {days.map((day, idx) => {
                            const thisDateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const hasWod = wods[thisDateKey];
                            return (
                                <div
                                    key={idx}
                                    onClick={() => day && setSelectedDate(day)}
                                    style={{
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: day ? 'pointer' : 'default',
                                        background: day === selectedDate ? 'var(--color-accent-primary)' : (day && hasWod ? 'rgba(0, 242, 255, 0.1)' : 'transparent'),
                                        color: day === selectedDate ? '#000' : (day ? '#fff' : 'transparent'),
                                        fontWeight: '700',
                                        border: day && hasWod && day !== selectedDate ? '1px solid rgba(0, 242, 255, 0.3)' : '1px solid transparent',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* WOD Details Card */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-xl)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'sticky',
                    top: '120px'
                }}>
                    <div style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-accent-primary)', letterSpacing: '0.2em' }}>
                            {new Date(currentYear, currentMonth).toLocaleString('ko-KR', { month: 'long' })} {selectedDate}일
                        </span>
                        {!isEditing && <button onClick={startEditing} className="edit-btn">EDIT</button>}
                    </div>

                    {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="Edit workout details..."
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: '#fff',
                                    padding: '1rem',
                                    border: '1px solid var(--color-accent-primary)',
                                    borderRadius: 'var(--radius-md)',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    lineHeight: '1.6'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={handleSave} className="save-btn" disabled={loading} style={{ flex: 1 }}>
                                    {loading ? 'SAVING...' : 'SAVE'}
                                </button>
                                <button onClick={() => setIsEditing(false)} className="cancel-btn">CANCEL</button>
                            </div>
                        </div>
                    ) : currentWod ? (
                        <>
                            <div style={{
                                whiteSpace: 'pre-line',
                                color: 'var(--color-text-secondary)',
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                background: 'rgba(0,0,0,0.3)',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                {currentWod.details}
                            </div>
                        </>
                    ) : (
                        <div style={{ color: '#555', fontStyle: 'italic', fontSize: '1.1rem' }}>
                            {loading ? '데이터를 불러오는 중...' : '등록된 운동이 없습니다. EDIT를 눌러 추가해 보세요!'}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .nav-btn {
                    background: none;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    padding: 5px 15px;
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .nav-btn:hover {
                    background: var(--color-accent-primary);
                    color: #000;
                }
                .edit-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: var(--color-accent-primary);
                    padding: 4px 10px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                }
                .save-btn {
                    background: var(--color-accent-primary);
                    border: none;
                    color: #000;
                    padding: 10px;
                    font-weight: 800;
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                }
                .save-btn:disabled {
                    background: #333;
                    color: #666;
                    cursor: not-allowed;
                }
                .cancel-btn {
                    background: none;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                    padding: 10px;
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                }
                @media (max-width: 900px) {
                    .content-wrapper {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="position: sticky"] {
                        position: static !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default OurWOD;
