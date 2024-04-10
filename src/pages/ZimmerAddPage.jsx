import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import propTypes from 'prop-types';

const ZimmerAddPage = ({addHotelzimmerSubmit}) => {
    const [hotelzimmerData, setHotelzimmerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Other state variables
    const [zimmernummer, setZimmernummer] = useState('');
    const [zimmernummerError, setZimmernummerError] = useState('');
    const [zimmergroesse, setZimmergroesse] = useState('');
    const [minibar, setMinibar] = useState(false);
    const [verfuegbarkeit, setVerfuegbarkeit] = useState('frei');
    const navigate = useNavigate();

    // Mapping friendly names to enum values
    const zimmergroessenMapping = {
        'Einzelzimmer': 'EINZELZIMMER',
        'Doppelzimmer': 'DOPPELZIMMER',
        'Suite': 'SUITE'
    };

    const zimmergroessenOptions = ['Auswählen', 'Einzelzimmer', 'Doppelzimmer', 'Suite'];


    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch("http://localhost:8080/api/hotelzimmer")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setHotelzimmerData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
                setError(error);
                setLoading(false);
            });
    }, []);

    const existingZimmernummern = hotelzimmerData.map(hz => hz.zimmernummer);

    const validateZimmernummer = (value) => {
        if (!value || isNaN(value) || Number(value) <= 0) {
            setZimmernummerError('Muss eine positive Zahl sein');
            return false;
        }

        if (existingZimmernummern.includes(Number(value))) {
            setZimmernummerError('Zimmer existiert bereits');
            return false;
        }

        setZimmernummerError('');
        return true;
    };

    const handleZimmernummerChange = (e) => {
        const value = e.target.value;
        setZimmernummer(value);
        validateZimmernummer(value);
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateZimmernummer(zimmernummer)) {
            return;
        }
        const enumZimmergroesse = zimmergroessenMapping[zimmergroesse]; // Convert to enum value
        const newHotelzimmer = { zimmernummer, zimmergroesse: enumZimmergroesse, minibar, frei: verfuegbarkeit === 'frei' };
        addHotelzimmerSubmit(newHotelzimmer);
        navigate(`/hotelzimmer`);
        window.location.reload();
    };

    // Rendering logic considering loading and error
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <section className="bg-sky-900 px-4 py-10 min-h-screen flex flex-col items-center">

            <h2 className='text-3xl font-bold text-center mb-4 text-white'>HOTELZIMMER</h2>
            <div className='bg-white p-8 rounded-lg shadow-md'>
                <div className='text-2xl font-bold mt-2 mb-2'>Zimmer hinzufügen</div>
                <div className="border border-gray-100 mb-5"></div>
                <form onSubmit={handleSubmit} className='mb-4'>
                    <div className='mb-4'>
                        <label htmlFor='zimmernummer' className='block mb-2'>Zimmernummer</label>
                        <input
                            type='text'
                            id='zimmernummer'
                            value={zimmernummer}
                            onChange={handleZimmernummerChange}
                            className='border rounded w-full py-2 px-3'
                            placeholder='Zimmernummer'
                            required
                        />
                        {zimmernummerError && <p className="text-red-500">{zimmernummerError}</p>}
                    </div>

                    {/* Zimmergroesse Dropdown */}
                    <div className='mb-4'>
                        <label htmlFor='zimmergroesse' className='block mb-2'>
                            Zimmergröße
                        </label>
                        <select
                            id='zimmergroesse'
                            value={zimmergroesse}
                            onChange={(e) => setZimmergroesse(e.target.value)}
                            className='border rounded w-full py-2 px-3'
                            required
                        >
                            <option disabled value=''>Auswählen</option>
                            {zimmergroessenOptions.slice(1).map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Minibar Field */}
                    <div className='mb-4'>
                        <label htmlFor='minibar' className='inline
                    mb-2 mr-2'>
                            Minibar vorhanden?
                        </label>
                        <input
                            type='checkbox'
                            id='minibar'
                            className='align-middle'
                            checked={minibar}
                            onChange={(e) => setMinibar(e.target.checked)}
                        />
                    </div>

                    {/* Verfügbarkeit Field */}
                    <div className='mb-4'>
                        <label className='block mb-2'>Verfügbarkeit</label>
                        <label htmlFor='frei' className='inline mr-2'>
                            <input
                                type='radio'
                                id='frei'
                                name='verfuegbarkeit'
                                value='frei'
                                checked={verfuegbarkeit === 'frei'}
                                onChange={() => setVerfuegbarkeit('frei')}
                                className='align-middle mr-1'
                            />
                            Frei
                        </label>
                        <label htmlFor='besetzt' className='inline '>
                            <input
                                type='radio'
                                id='besetzt'
                                name='verfuegbarkeit'
                                value='besetzt'
                                checked={verfuegbarkeit === 'besetzt'}
                                onChange={() => setVerfuegbarkeit('besetzt')}
                                className='align-middle mr-1'
                            />
                            Belegt
                        </label>
                    </div>

                    <button type='submit'
                            className="h-[36px] bg-sky-700 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-center text-sm mr-2">
                        Hotelzimmer hinzufügen
                    </button>
                </form>
            </div>
        </section>
    );
};

ZimmerAddPage.propTypes = {
    addHotelzimmerSubmit: propTypes.func.isRequired
};

export default ZimmerAddPage;