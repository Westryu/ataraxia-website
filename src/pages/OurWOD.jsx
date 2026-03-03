import React, { useState, useEffect } from 'react';
import '../index.css';

const OurWOD = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');

    // Persistence with localStorage
    const [wods, setWods] = useState(() => {
        const saved = localStorage.getItem('ataraxia_wods_v2');
        if (saved) return JSON.parse(saved);

        // Default data if none in localStorage
        return {
            "2026-03-03": { title: "Push Press & Jerk", details: "A.\n5 PUSH PRESS HEAVY\nFROM FLOOR\n\nB.\n5 PUSH JERK HEAVY\nFROM FLOOR\n\nC.\n55 DL 225#\n55 WB 20#\n55 CAL ROW\n55 HSPU\nREMAINING TIME MAX WALLWALK" },
            "2026-03-02": { title: "Front Squat & Thrusters", details: "A.\nFS HEAVY SINGLE\n\nB.\nFOR TIME\n21 THRUSTERS 115#\n15 B.MU\n15 THRUSTERS\n12 B.MU\n9 THRUSTERS\n9 B.MU\n\nC.\n3 SETS\nST CTB MAX\nREST 3:00 B/T" },
            "2026-02-28": { title: "Team WOD / AMRAP", details: "A1.\nCG.I.BP\n5,4,3,2\n\nA2.\n5 DB RDL SL / leg\n\nB.\n10 min AMRAP\nP1 : max AB\nP2, P3 : 15 WB shot(each)\n\n5 min rest\n\n10 min AMRAP\nP1 : max row\nP2, P3 : 7 burpee pull up(each)\n\n5 min rest\n\n10 min AMRAP\nP1 : max AB\nP2, P3 : 10 single DB box step over(each)" },
            "2026-02-27": { title: "Clean & Squat Complex", details: "A.\n4 SETS\n1 CLEAN\n+\n4 R.LUNGE \n+\n4 FRONT SQUAT\nREST 2:00 B/T\n\nB.\nDB ROW\n3X10\n\nC.\nFOR TIME\n75 CAL SKI\n75 CAL AB\n75 CAL ROW\n800M RUN" },
            "2026-02-26": { title: "Bench Press & Pull Ups", details: "A.\n5 SETS\nMAX BP 185#\nMAX ST PULL UP\nREST 5:00 B/T\n\nB.\n8 SETS\nP1 : MAX CAL AB\nP2 : 160M SHUTTLE RUN (7M)\nTHEN REST 1:00\n3:00 LINE FACING BURPEE" },
            "2026-02-25": { title: "Power Clean & AMRAP", details: "A.\nEVERY 2:00 FOR 10 SETS\n2 S.PC\n\nB.\nAMRAP 7:00\n9 TTB\n7 BJ 24\"\n5 HPC 135#\n\nREST 3:00\n\nAMRAP 7:00\n5 HR PUSH UP\n5 DL 135#\n10 CAL ROW\n\nC.\n3 SETS\nBARBELL FRONT RACK SPLIT SQUAT 5 REPS\nREST :20\n:30 SUPERMAN HOLD WTD\nREST 2:00 B/T" },
            "2026-02-24": { title: "Push Press & Jerk", details: "A.\nPUSH PRESS\n3, 2, 1, 3, 2, 1\n\nB.\nPUSH JERK\n8, 8, 8\n\nC.\n2 SETS\nMAX K.HSPU\nREST 5:00 B/T\n\nD.\n100 W.DU\n21-15-9\nTTB\nHR.PUSH UP\n100 W.DU" },
            "2026-02-23": { title: "Front Squat & CTB", details: "A.\nFS @30X1\n5, 4, 3, 2\nREST 2:00 B/T\n\nB.\n4 SETS\nST CTB WTD\n2, 2, 2\nREST 2:00 B/T\n\nC.\nEMOM X 10\n10 WB 30#\n6 B.MU\n*SAME TIME\n\nEMOM X 10\n2 L.C\n6 THRUSTERS 95#\n*SAME TIME" },
            "2026-02-21": { title: "BP & RDL + Conditioning", details: "4 SETS\nA1.\n3 CG.I.BP\nA2.\n8 LM.SL RDL\nREST 2:00 B/T\n\nB.\n5 SETS\n20 DB SNATCHS 50#\n15 BURPEE\n20 CAL ROW\n10 STOH 135#\n50 D.U\n5 P.C 135#\nREST 5:00 B/T" },
            "2026-02-20": { title: "Clean & Squat + Run", details: "A.\n5 SETS\n1CLEAN + 3F.S + 4LUNGE\nREST 2:00 B/T\n\nB.\nDB ROW / ARM\n3 X 10\nREST 2:00 B/T\n\nC.\n4RDS\n400M RUN\n40 WALKING LUNGE\n40 ALT SA DB HANG CLEAN&JERK 50#" },
            "2026-02-19": { title: "Bench Press & Pull Ups", details: "A.\n5 SETS\n10 BP 185#\n10 ST PULL UPS\n20 DB BENCH PRESS 50#\n10 ST PULL UPS\n30 PUSH UPS\nREST 3:00 B/T\n\nB.\nEMOM X 10\n3 DEADLIFT 315#" },
            "2026-02-18": { title: "Squat & Power Clean", details: "A1.\n4 SETS\n5 FRONT RACK SPLIT SQUAT\n@2020\nA2.\n3 SUPERMAN HOLD @1118\nREST 2:00 B/T\n\nB.\nEVERY 1:30 FOR 10 SETS\n2 P.C 72.5-82.5%\n\nC.\nAMRAP 7:00\n15 BJ 20\"\n12 KB GOBLET SQUAT 53#\n9 CAP AB\n\nREST 3:00\n\nAMRAP 7:00\n12 KB DL 70#\n9 CAL ROW\n6 DB SNATCHS 70#" },
            "2026-02-17": { title: "Press & Jerk + Conditioning", details: "A.\nEVERY 1:30 FOR 6 SETS\n2 PUSH PRESS 70-72.5%\n\nB.\nEVERY 1:30 FOR 6 SETS\n2 PUSH JERK 70-72.5%\n\nC.\n4 SETS\n:30 MAX ST P.HSPU\nREST :30\n:30 MAX K.HSPU\nREST 3:00 B/T\n\nD.\n3 SETS\n200M RUN\n7 BBJ 30\"\n15 AB MAT SIT UPS\n200M ROW\n35 W.DU\n3 W.W\nREST 1:00 B/T" },
            "2026-02-16": { title: "Front Squat & Muscle Ups", details: "A.\n4 SETS\n6 DEADSTOP FRONT SQUAT 72.5% \n\nB1.\n4 SETS\n2 BS @22X1\nB2.\n4 WTD ST PULL UP\nREST 2:00 B/T\n\nEMOM X 20\n15 WB 30#\n6 B.MU\n\nRIGHT INTO\n\nEMOM X 20\n2 L.C\n8 THRUSTERS 95#" },
            "2026-02-14": { title: "BP & SL DL + Conditioning", details: "A1.\n4 SETS\nCG I.BP @2020\n4 REPS\n\nA2.\nSINGLE LEG KB DL / LEG\n8 REPS\nREST 2:00 B/T\n\nB.\n5 SETS\n16 DB SNATCHS 60#\n12 NO PUSH UP BURPEE\n20 CAL AB\n12 STOH 115#\n36 W.DU\n10 PC 115#\nREST 1:1 or 5:00 B/T" },
            "2026-02-13": { title: "Clean & Squat + AMRAP", details: "A.\n4 SETS\n1 CLEAN + 4 FRONT SQUAT @14X1\n\nB1.\n4 SETS\nKB FRONT RACK DROP LUNGE 2\" 6 REPS / LEG\nB2.\nDB TORSO ROW @30X1\n6 REPS\nREST 2:00 B/T\n\nC.\nFOR TIME\n2 ROUNDS\n400M RUN\n15 WALL WALKS\n40 CAL AB\n30 BOX STEP UPS 24\"\n500M ROW" },
            "2026-02-12": { title: "Warm up & AMRAP", details: "WARM UP\n3 SETS\n10 BIRD DOGS \n10 DEAD BUGS\n:30 SIDE PLANK\n15M DB SINGLE ARM FARMERS CARRY\n\n3 SETS\n1:00 AB\n8 RING ROW\n4 INCHWORM\n2 ST PULL UPS\n10 KANG SQUAT\n\nAMRAP 24:00\nBUY IN 2MILE AB\nRT MAX RDS\n10 ST PULL UPS\n10 DB BENCH PRESS 85#\n30M BODY WEIGHT WALKING LUNGES" },
            "2026-02-11": { title: "Split Squat & Clean", details: "4 SETS\nA1.\nFRONT RACK REAR FOOT ELEAVTED SPLIT SQUAT\n5 REPS\n\nA2.\nSUPERMAN HOLD @1116\n5 REPS\nREST 2:00 B/T\n\nB.\nEVERY 1:30 FOR 10 SETS\n1, 1 SEGMENT POWER CLEAN\n\nC.\nAMRAP 7:00\n15 AIR SQUATS\n12 BJ 24\"\n12 CAL ROW\n\nREST 1:00\n\nAMRAP 7:00\n10 DB DEADLIFTS 85#\n10 RING PUSH UPS\n10 CAL ROW" },
            "2026-02-10": { title: "Push Press & Jerk", details: "A.\n5 SETS\n3 PUSH PRESS\nREST 1:30 B/T\n\n\nB.\n5 SETS\n1, 1 PUSH JERK\nREST :30\n3 ST.P.HSPU\nREST :30\n:20 MAX HSPU\nREST 3:00 B/T\n\nC.\n3 SETS\n15 CAL AB\n10 NO PUSH UP BURPEE BJ 24\"\n10 KB SWINGS 88#\n15 AB MAT SIT UPS\n200M ROW\n45 H.DU\nREST 1:00 B/T" },
            "2026-02-09": { title: "Front Squat & Snatch", details: "A.\nDEADSTEP FS 70% +5~10#\n8 REPS\nREST 3~4:00 B/T\n\nB1.\nBS @22X1\n3, 3, 2, 2\n\nB2.\nST PULL UP @30X1\n4 REPS\nREST 2:00 B/T\n\nC.\nEMOM X 18\n5 B.MU\n3 KB THRUSTERS 70# / EACH\n\nRIGHT INTO\n\nEMOM X 18\n2 L.C\n1 SQUAT SNATCH + 1 HANG SQUAT SNATCH" }
        };
    });

    useEffect(() => {
        localStorage.setItem('ataraxia_wods_v2', JSON.stringify(wods));
    }, [wods]);

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

    const handleSave = () => {
        const lines = editContent.split('\n');
        const title = lines[0] || "No Title";
        const details = lines.slice(1).join('\n');

        setWods(prev => ({
            ...prev,
            [dateKey]: { title, details }
        }));
        setIsEditing(false);
    };

    const startEditing = () => {
        setEditContent(currentWod ? `${currentWod.title}\n${currentWod.details}` : '');
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
                alignItems: 'start'
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
                                placeholder="First line: Title\nRest: Details"
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: '#fff',
                                    padding: '1rem',
                                    border: '1px solid var(--color-accent-primary)',
                                    borderRadius: 'var(--radius-md)',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={handleSave} className="save-btn" style={{ flex: 1 }}>SAVE</button>
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
                        <div style={{ color: '#555', fontStyle: 'italic', fontSize: '1.1rem' }}>No workout session recorded for this day. Click EDIT to add one!</div>
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
