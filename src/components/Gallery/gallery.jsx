import './gallery.css';
import { useState } from 'react';
import Title from '../Title/title.jsx';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Sample gallery images - replace with your actual church images
    const galleryImages = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
            alt: 'Church Interior',
            title: 'Sunday Service'
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=300&fit=crop',
            alt: 'Community Gathering',
            title: 'Community Fellowship'
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
            alt: 'Youth Group',
            title: 'Youth Ministry'
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400&h=300&fit=crop',
            alt: 'Church Exterior',
            title: 'Our Beautiful Church'
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
            alt: 'Prayer Meeting',
            title: 'Prayer & Worship'
        },
        {
            id: 6,
            src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
            alt: 'Bible Study',
            title: 'Bible Study Group'
        },
        {
            id: 7,
            src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
            alt: 'Community Outreach',
            title: 'Community Outreach'
        },
        {
            id: 8,
            src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
            alt: 'Online Service',
            title: 'Virtual Worship'
        }
    ];

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImage(galleryImages[nextIndex]);
    };

    const prevImage = () => {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
        setSelectedImage(galleryImages[prevIndex]);
    };

    return (
        <div className='gallery container'>
            <div className="gallery-header">
                <Title title={"Our Church Gallery"} subtitle={"Capturing moments of faith, fellowship, and community"}/>
            </div>
            
            <div className="gallery-grid">
                {galleryImages.map((image) => (
                    <div 
                        key={image.id} 
                        className="gallery-item"
                        onClick={() => openModal(image)}
                    >
                        <img 
                            src={image.src} 
                            alt={image.alt}
                            loading="lazy"
                        />
                        <div className="gallery-overlay">
                            <h3>{image.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for enlarged image view */}
            {selectedImage && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <button className="nav-btn prev-btn" onClick={prevImage}>‹</button>
                        <img 
                            src={selectedImage.src} 
                            alt={selectedImage.alt}
                            className="modal-image"
                        />
                        <button className="nav-btn next-btn" onClick={nextImage}>›</button>
                        <div className="modal-info">
                            <h3>{selectedImage.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;