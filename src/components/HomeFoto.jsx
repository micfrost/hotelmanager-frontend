import { useState, useEffect } from 'react';
import hotelImage from '../assets/images/hotel.jpg';

const HomeFoto = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const imageContainerStyle = {
        position: 'relative',
        overflow: 'hidden',
        height: windowWidth <= 600 ? 'calc(100vh - 265px)' : 'calc(100vh - 290px)'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    };

    return (
        <div style={imageContainerStyle}>
            <img src={hotelImage} alt="Hotel" style={imageStyle} />
        </div>
    );
};

export default HomeFoto;