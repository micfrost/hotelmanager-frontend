import {Link, useNavigate, useParams} from 'react-router-dom';
import ZimmerSingle from "../components/ZimmerSingle.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner.jsx";

// Define a functional component to render the Single Zimmer page with the deleteHotelzimmer function as a prop
const ZimmerSinglePage = ({deleteHotelzimmer}) => {

    // Use the useNavigate hook to navigate to the hotelzimmer page after deleting a hotelzimmer
    const navigate = useNavigate();

    // Get the zimmernummer from the URL params
    const {zimmernummer} = useParams();

    // State to track loading
    const [isLoading, setLoading] = useState(true);
    const [hotelzimmer, setHotelzimmer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await hotelzimmerLoader({ params: { zimmernummer } });
                setHotelzimmer(data);
            } catch (error) {
                console.error('Error fetching hotelzimmer data:', error);
                // Handle error state as well
            }
            setLoading(false);
        };
        fetchData();
    }, [zimmernummer]);

    // Handler function to delete a hotelzimmer
    const onDeleteClick = () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this listing?'
        );
        if (!confirmDelete) return;
        deleteHotelzimmer(zimmernummer);
        // pause 1 seconds before reloading the page
        setTimeout(() => {  navigate('/hotelzimmer'); }, 1000);
        // window.location.reload();
    };

    if (isLoading) return <Spinner />;

    // Render the ZimmerSinglePage component with the hotelzimmer data and the deleteHotelzimmer function
    return (
        <>

            <section className="bg-sky-900 px-4 py-10 h-screen flex flex-col items-center">
                <h2 className='text-3xl font-bold text-center mb-4 text-white'>HOTELZIMMER</h2>
                <div className="flex flex-col md:flex-row justify-center items-start md:space-x-4 mt-6">

                    {/*ZimmerSingle component*/}
                    <div className="mb-4 md:mb-0">
                        <ZimmerSingle hotelzimmer={hotelzimmer}/>
                    </div>

                    {/*Action buttons*/}
                    <div className='bg-white p-4 rounded-lg shadow-md'>
                        <div className='text-2xl font-bold mt-2 mb-2'>
                            Zimmer anpassen
                        </div>
                        <div className="border border-gray-100 mb-5"></div>

                        {/*Ändern*/}
                        <p className='mt-4 mb-2'>
                            Willst du das Zimmer ändern?
                        </p>
                        <Link
                            to={`/edit-hotelzimmer/${zimmernummer}`}
                            className="h-[36px] bg-sky-700 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-center text-sm mr-2 mb-2">
                            ÄNDERN
                        </Link>

                        {/*Löschen*/}
                        <div className="border border-gray-100 mt-4 mb-5"></div>
                        <p className='mt-6 mb-2'>
                            Willst du das Zimmer löschen?
                        </p>
                        <button onClick={onDeleteClick}
                                className="h-[36px] bg-sky-700 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-center text-sm mr-2">
                            LÖSCHEN
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

// Loader function to fetch the hotelzimmer data using the zimmernummer from the URL params
const hotelzimmerLoader = async ({ params }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/hotelzimmer/${params.zimmernummer}`);
        if (!response.ok) {
            throw new Error('Daten konnten nicht abgerufen werden');
        }
        return await response.json();
    } catch (error) {
        console.error('Fehler beim Abrufen der Hotelzimmerdaten: ', error);
        return null; // Return null in case of error
    }
};


// Define the prop types for the ZimmerSinglePage component
ZimmerSinglePage.propTypes = {
    deleteHotelzimmer: PropTypes.func.isRequired,
};


export {ZimmerSinglePage as default, hotelzimmerLoader};


