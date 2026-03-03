import React, { useEffect, useState } from 'react';
import '../index.css';

// Mock images using existing assets or placeholders since generation is limited
import rulesImg from '../assets/rules_image.jpg';
import workoutImg from '../assets/workout.jpg';

const OurGallery = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const galleryImages = [
        { id: 1, src: workoutImg, title: "Strength & Honor", category: "Training" },
        { id: 2, src: rulesImg, title: "The Ataraxia Code", category: "Philosophy" },
        { id: 3, src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop", title: "Iron Sanctuary", category: "Space" },
        { id: 4, src: "https://images.unsplash.com/photo-1541534741688-6078c64b5903?q=80&w=1470&auto=format&fit=crop", title: "Soul Focus", category: "Mind" },
        { id: 5, src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop", title: "Primal Energy", category: "Community" },
        { id: 6, src: "https://images.unsplash.com/photo-1571731956672-f2b94d7db0cb?q=80&w=1472&auto=format&fit=crop", title: "Eternal Forge", category: "Power" }
    ];

    return (
        <div className="page-container fadeInUp">
            <h1 className="page-title">GALLERY</h1>

            <div className="content-wrapper">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--spacing-lg)',
                    padding: 'var(--spacing-md)'
                }}>
                    {galleryImages.map((img) => (
                        <div
                            key={img.id}
                            className="gallery-item"
                            style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.querySelector('.overlay').style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.querySelector('.overlay').style.opacity = '0';
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    transition: 'filter 0.5s ease'
                                }}
                            />
                            <div
                                className="overlay"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to top, rgba(0, 242, 255, 0.6) 0%, transparent 60%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: 'var(--spacing-lg)',
                                    opacity: 0,
                                    transition: 'opacity 0.5s ease'
                                }}
                            >
                                <span style={{
                                    fontSize: '0.7rem',
                                    color: '#000',
                                    fontWeight: '900',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    marginBottom: '4px'
                                }}>
                                    {img.category}
                                </span>
                                <h3 style={{ fontSize: '1.4rem', color: '#000', fontWeight: '900', margin: 0 }}>
                                    {img.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurGallery;
