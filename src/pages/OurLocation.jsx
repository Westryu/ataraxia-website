import React from 'react';
import '../index.css';

const OurLocation = () => {
    // Google Maps Embed URL for "양재동 92-9"
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3165.731309855325!2d127.03829237648356!3d37.47785567206126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca6cab863f2fb%3A0xe26b5c3f45ecdc45!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCD some_location_text!5e0!3m2!1sko!2skr!4v1710000000000!5m2!1sko!2skr";

    // Using the raw link provided by user to extract direct parameters or using a standard embed for that address
    const directMapLink = "https://www.google.com/maps/place/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%84%9C%EC%B4%88%EA%B5%AC+%EC%96%91%EC%9E%AC%EB%8F%99+92-9/data=!3m1!4b1!4m6!3m5!1s0x357ca6cab863f2fb:0xe26b5c3f45ecdc45!8m2!3d37.4778557!4d127.0408673!16s%2Fg%2F11bzblvry3";

    return (
        <div className="page-container fadeInUp">
            <h1 className="page-title">LOCATION</h1>

            <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                <div style={{
                    width: '100%',
                    height: '450px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: 'var(--shadow-glow)'
                }}>
                    <iframe
                        title="Ataraxia Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.731309855325!2d127.03829237648356!3d37.47785567206126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca6cab863f2fb%3A0xe26b5c3f45ecdc45!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDslpHsnqTr some_location!5e0!3m2!1sko!2skr!4v1740000000000!5m2!1sko!2skr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div className="location-info-box" style={{
                    padding: 'var(--spacing-lg)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-accent-primary)' }}>ADDRESS</h2>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>서울특별시 서초구 양재동 92-9</p>
                    <a
                        href={directMapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            marginTop: 'var(--spacing-md)',
                            padding: '0.8rem 1.5rem',
                            background: 'var(--color-accent-primary)',
                            color: '#000',
                            fontWeight: '700',
                            borderRadius: 'var(--radius-full)',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Open in Google Maps
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OurLocation;
