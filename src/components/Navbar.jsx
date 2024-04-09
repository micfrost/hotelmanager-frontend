import {NavLink} from 'react-router-dom';
import {FaBed} from "react-icons/fa";
import ZimmerSearch from "./ZimmerSearch.jsx";


const Navbar = () => {
    const linkClass = ({isActive}) =>
        isActive
            ? 'bg-sky-950 text-sky-100 hover:bg-sky-950 hover:text-sky-100 rounded-md px-3 py-4'
            : 'text-sky-100 hover:bg-sky-950 hover:text-sky-100 rounded-md px-3 py-4';

    return (
        <nav className="bg-sky-900 border-b border-sky-700">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">

                        <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                            <FaBed className=' text-4xl mb-1 mr-1 text-sky-100'/>

                            <span className="hidden md:block text-sky-100 text-2xl font-bold ml-2">
                                HOTELMANAGER</span>
                        </NavLink>

                        <div className="md:ml-auto">
                            <div className="flex space-x-2">
                                <ZimmerSearch />

                                <NavLink
                                    to="/hotelzimmer"
                                    className={linkClass}>
                                    ZIMMER LISTE
                                </NavLink>

                                <NavLink
                                    to="/add-hotelzimmer"
                                    className={linkClass}>
                                    NEUES ZIMMER
                                </NavLink>

                                <NavLink
                                    to="/login"
                                    className={linkClass}>
                                    LOG
                                </NavLink>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
