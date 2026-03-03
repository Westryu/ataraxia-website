import React, { useEffect, useState } from 'react';
import '../index.css';

// 1. 여기에 사용할 이미지를 import 하세요
import workoutImg from '../assets/workout.jpg';
import gallery1 from '../assets/gallery_1.jpg';
import gallery2 from '../assets/gallery_2.jpg';

const OurGallery = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // 2. 이 배열에 새로운 이미지 객체를 추가하면 갤러리에 나타납니다.
    const galleryImages = [
        { id: 1, src: workoutImg, title: "24hr Rowing challenge" },
        { id: 2, src: gallery1, title: "strength & focus" },
        { id: 3, src: gallery2, title: "ice bath recovery" },
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
                                    background: 'linear-gradient(to top, rgba(0, 242, 255, 0.6) 20%, transparent 60%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: 'var(--spacing-lg)',
                                    opacity: 0,
                                    transition: 'opacity 0.5s ease'
                                }}
                            >
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    color: '#000',
                                    fontWeight: '900',
                                    margin: 0,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase'
                                }}>
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
