import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

const ZimmerCard = ({hotelzimmer}) => {
    const location = useLocation();

    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-8">
                <div className="mb-6">
                    <div className="text-2xl font-bold mt-2 mb-2">
                        Zimmernummer: {hotelzimmer.zimmernummer}</div>
                    <div className="border border-gray-100 mb-5"></div>
                    <div className="mt-2 mb-2">
                        Zimmergröße: {hotelzimmer.zimmergroesse}</div>

                    <div className="mt-2 mb-2">
                        {hotelzimmer.minibar ? "Mit einer Minibar" : "Ohne Minibar"}
                    </div>

                    <div className="mt-2 mb-2">
                        {hotelzimmer.frei ? "Das ZimmerDetail ist frei" : "Das ZimmerDetail ist belegt"}
                    </div>
                    <div className="border border-gray-100 mb-5"></div>
                </div>


                {(location.pathname === '/hotelzimmer' || location.pathname === '/') && (
                    <div className="mb-2">
                        <div className='mt-2 mb-4'>
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

ZimmerCard.propTypes = {
    hotelzimmer: PropTypes.shape({
        zimmernummer: PropTypes.number.isRequired,
        zimmergroesse: PropTypes.string.isRequired,
        minibar: PropTypes.bool.isRequired,
        frei: PropTypes.bool.isRequired
    }).isRequired
};

export default ZimmerCard;
