import { useState, useEffect } from 'react';
import hotelImage from '../assets/images/hotel.jpg';

// Define a functional component that returns a home photo section
const HomeFoto = () => {
    // State hook to manage the window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Effect hook to update window width on resize
    useEffect(() => {

        const handleResize = () => {
            // Update window width state
            setWindowWidth(window.innerWidth);
        };

        // Add event listener for resize event
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures effect runs only once after initial render

    // Inline style object for the image container
    const imageContainerStyle = {
        position: 'relative', // Positioning
        overflow: 'hidden', // Hide overflowing content
        // Conditional height based on window width
        height: windowWidth <= 600 ? 'calc(100vh - 265px)' : 'calc(100vh - 290px)'
    };

    // Inline style object for the image
    const imageStyle = {
        width: '100%', // Full width
        height: '100%', // Full height
        objectFit: 'cover' // Maintain aspect ratio and cover container
    };

    // Render the component
    return (
        <div style={imageContainerStyle}> {/* Apply image container style */}
            <img src={hotelImage} alt="Hotel" style={imageStyle} /> {/* Display the image */}
        </div>
    );
};


export default HomeFoto;
