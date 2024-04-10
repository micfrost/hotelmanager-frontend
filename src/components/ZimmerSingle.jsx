import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

// Define a functional component to display a single hotelzimmer item
const ZimmerSingle = ({hotelzimmer}) => {

    // Get the current location to know which page is currently active
    const location = useLocation();


    // Mapping friendly names to enum values to display in the UI
    const zimmergroessenMapping = {
        'EINZELZIMMER': 'Einzelzimmer',
        'DOPPELZIMMER': 'Doppelzimmer',
        'SUITE': 'Suite'
    };

    // Get the friendly name for the zimmergroesse enum value
    const zimmergroesseDisplay = zimmergroessenMapping[hotelzimmer.zimmergroesse];

    // Render the ZimmerSingle component with the hotelzimmer data
    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-8">
                <div className="mb-6">

                    {/*Zimmenummer*/}
                    <div className="text-2xl font-bold mt-2 mb-2">
                        Zimmernummer: {hotelzimmer.zimmernummer}</div>
                    <div className="border border-gray-100 mb-5"></div>

                    {/*Zimmergröße*/}
                    <div className="mt-2 mb-2">
                        Zimmergröße: {zimmergroesseDisplay}</div>

                    {/*Minibar*/}
                    <div className="mt-2 mb-2">
                        {hotelzimmer.minibar ? "Mit einer Minibar" : "Ohne Minibar"}
                    </div>

                    {/*Verfügbarkeit*/}
                    <div className="mt-2 mb-5">
                        {hotelzimmer.verfuegbarkeit ? "Das Zimmer ist frei" : "Das Zimmer ist belegt"}
                    </div>
                    <div className="border border-gray-100 mb-5"></div>
                </div>

                {/*Render the DETAILSEITE button only on the hotelzimmer page*/}
                {(location.pathname === '/hotelzimmer' || location.pathname === '/') && (
                    <div className="mb-2">
                        <div className=' mb-4'>
                            <p> Das zimmer ändern oder löschen?</p>
                            <p>Siehe Detailseite</p>
                        </div>
                        <Link
                            to={`/hotelzimmer/${hotelzimmer.zimmernummer}`}
                            className="h-[36px] bg-sky-700 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-center text-sm mr-2"
                        >
                            DETAILSEITE
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};


// Define the prop types for the ZimmerSingle component to ensure that the correct props are passed to the component
// and to display warnings in the console if the props are not passed correctly
ZimmerSingle.propTypes = {
    hotelzimmer: PropTypes.shape({
        zimmernummer: PropTypes.number.isRequired,
        zimmergroesse: PropTypes.oneOf(['EINZELZIMMER', 'DOPPELZIMMER', 'SUITE']).isRequired,
        minibar: PropTypes.bool.isRequired,
        verfuegbarkeit: PropTypes.bool.isRequired
    }).isRequired
};

export default ZimmerSingle;
