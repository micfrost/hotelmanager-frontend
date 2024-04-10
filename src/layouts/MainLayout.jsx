import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from "../components/Hero.jsx";

const MainLayout = () => {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Outlet/>
            <Footer/>
        </>
    );
};
export default MainLayout;
