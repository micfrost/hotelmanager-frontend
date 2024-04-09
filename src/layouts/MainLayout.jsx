import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from "../components/Hero.jsx";



const MainLayout = () => {
    return (
        <>
            <Navbar/>

            <Hero/>
            <Outlet/>
            <ToastContainer/>
            <Footer/>
        </>
    );
};
export default MainLayout;
