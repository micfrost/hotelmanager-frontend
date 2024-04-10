import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from "../components/Hero.jsx";

// Define the MainLayout component
const MainLayout = () => {

    // Render the MainLayout component with Navbar, Hero, Outlet, and Footer components
    return (
        <>
            <Navbar/>
            <Hero/>

            {/*Outlet component to render child components of the current route*/}
            <Outlet/>

            <Footer/>
        </>
    );
};
export default MainLayout;
