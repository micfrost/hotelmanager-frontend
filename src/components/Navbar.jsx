import {NavLink} from 'react-router-dom';
import {FaBed} from "react-icons/fa";
import ZimmerSearch from "./ZimmerSearch.jsx";

// Define a functional component that returns a navigation bar
const Navbar = () => {

    // Function to determine the active link class based on the isActive prop value passed by NavLink component
    const linkClass = ({isActive}) =>
        isActive
            ? 'bg-sky-950 text-sky-100 hover:bg-sky-950 hover:text-sky-100 rounded-md px-3 py-4'
            : 'text-sky-100 hover:bg-sky-950 hover:text-sky-100 rounded-md px-3 py-4';

    // Render the Navbar component with a navigation bar and links
    return (
        <nav className="bg-sky-900 border-b border-sky-700">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">

                        {/* Logo and Brand */}
                        <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                            <FaBed className=' text-4xl mb-1 mr-1 text-sky-100'/>
                            <span className="hidden md:block text-sky-100 text-2xl font-bold ml-2">
                                HOTELMANAGER</span>
                        </NavLink>

                        <div className="md:ml-auto">
                            <div className="flex space-x-2">

                                {/* NavLink for Zimmer List */}
                                <NavLink
                                    to="/hotelzimmer"
                                    className={linkClass}>
                                    ZIMMER LISTE
                                </NavLink>

                                {/* NavLink for New Zimmer */}
                                <NavLink
                                    to="/add-hotelzimmer"
                                    className={linkClass}>
                                    NEUES ZIMMER
                                </NavLink>

                                {/* ZimmerSearch component */}
                                <ZimmerSearch />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
