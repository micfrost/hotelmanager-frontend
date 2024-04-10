import {Link, useLoaderData, useNavigate, useParams} from 'react-router-dom';
import ZimmerSingle from "../components/ZimmerSingle.jsx";

import PropTypes from "prop-types";


const ZimmerSinglePage = ({deleteHotelzimmer}) => {

    const navigate = useNavigate();
    const {zimmernummer} = useParams();
    const hotelzimmer = useLoaderData({params: {zimmernummer}});

    const onDeleteClick = () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this listing?'
        );

        if (!confirmDelete) return;

        deleteHotelzimmer(zimmernummer);
        navigate('/hotelzimmer');
        window.location.reload();
    };


    return (
        <>
            <section className="bg-sky-900 px-4 py-10 h-screen flex flex-col items-center">

                <h2 className='text-3xl font-bold text-center mb-4 text-white'>HOTELZIMMER</h2>


                <div className="flex flex-col md:flex-row justify-center items-start md:space-x-4 mt-6">
                    <div className="mb-4 md:mb-0">
                        <ZimmerSingle hotelzimmer={hotelzimmer}/>
                    </div>

                    <div className='bg-white p-4 rounded-lg shadow-md'>
                        <div className='text-2xl font-bold mt-2 mb-2'>
                            Zimmer anpassen
                        </div>
                        <div className="border border-gray-100 mb-5"></div>

                        <p className='mt-4 mb-2'>
                            Willst du das Zimmer ändern?
                        </p>
                        <Link
                            to={`/edit-hotelzimmer/${zimmernummer}`}
                            className="h-[36px] bg-sky-700 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-center text-sm mr-2 mb-2">
                            ÄNDERN
                        </Link>

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



const hotelzimmerLoader = async ({
                                     params
                                 }) => {
    const res = await fetch(`http://localhost:8080/api/hotelzimmer/${params.zimmernummer}`);
    return await res.json();
};


ZimmerSinglePage.propTypes = {
    deleteHotelzimmer: PropTypes.func.isRequired,
};


export {ZimmerSinglePage as default, hotelzimmerLoader};


