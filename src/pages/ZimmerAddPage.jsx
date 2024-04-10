import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import propTypes from 'prop-types';

// Define the ZimmerAddPage functional component that renders a form to add a new hotelzimmer
const ZimmerAddPage = ({addHotelzimmerSubmit}) => {

    // State to store fetched data and error, empty array as initial value for hotelzimmerData state variable
    const [hotelzimmerData, setHotelzimmerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State to store form input values and errors for validation purposes
    const [zimmernummer, setZimmernummer] = useState('');
    const [zimmernummerError, setZimmernummerError] = useState('');
    const [zimmergroesse, setZimmergroesse] = useState('');
    const [minibar, setMinibar] = useState(false);
    const [verfuegbarkeit, setVerfuegbarkeit] = useState(true); // Initialize as true (or false as needed)

    const navigate = useNavigate();

    // Mapping friendly names to enum values to display in the UI
    const zimmergroessenMapping = {
        'Einzelzimmer': 'EINZELZIMMER',
        'Doppelzimmer': 'DOPPELZIMMER',
        'Suite': 'SUITE'
    };

    // Zimmergroessen dropdown options array
    const zimmergroessenOptions = ['Auswählen', 'Einzelzimmer', 'Doppelzimmer', 'Suite'];


    // Fetch data from the API to fill the hotelzimmerData state and handle loading and error states
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


    // Get existing zimmernummern from the fetched data
    const existingZimmernummern = hotelzimmerData.map(hz => hz.zimmernummer);


    // Validate zimmernummer input field
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

    // Event handler function to update the zimmernummer state variable and validate the input
    const handleZimmernummerChange = (e) => {
        const value = e.target.value;
        setZimmernummer(value);
        validateZimmernummer(value);
    };

    // Form submit handler function to add a new hotelzimmer and navigate to the hotelzimmer page
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateZimmernummer(zimmernummer)) {
            return;
        }
        const enumZimmergroesse = zimmergroessenMapping[zimmergroesse]; // Convert to enum value
        const newHotelzimmer = { zimmernummer, zimmergroesse: enumZimmergroesse, minibar, verfuegbarkeit };
        try {
            await addHotelzimmerSubmit(newHotelzimmer);
            navigate('/hotelzimmer');
            // without reload the page the data will not be updated - to be fixed
            window.location.reload();
        } catch (error) {
            console.error('Error adding hotelzimmer:', error);
        }
    };



    // Render loading message while fetching data from the API
    if (loading) return <p>Loading data...</p>;

    // Render error message if there is an error fetching data from the API
    if (error) return <p>Error loading data: {error.message}</p>;


    // Render the form to add a new hotelzimmer
    return (
        <section className="bg-sky-900 px-4 py-10 min-h-screen flex flex-col items-center">

            <h2 className='text-3xl font-bold text-center mb-4 text-white'>HOTELZIMMER</h2>
            <div className='bg-white p-8 rounded-lg shadow-md'>
                <div className='text-2xl font-bold mt-2 mb-2'>Zimmer hinzufügen</div>
                <div className="border border-gray-100 mb-5"></div>
                <form onSubmit={handleSubmit} className='mb-4'>

                    {/*Zimmernummer*/}
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
                        <label htmlFor='true' className='inline mr-2'>
                            <input
                                type='radio'
                                id='true'
                                name='verfuegbarkeit'
                                checked={verfuegbarkeit}
                                onChange={() => setVerfuegbarkeit(true)}
                                className='align-middle mr-1'
                            />
                            Frei
                        </label>
                        <label htmlFor='false' className='inline'>
                            <input
                                type='radio'
                                id='false'
                                name='verfuegbarkeit'
                                checked={!verfuegbarkeit}
                                onChange={() => setVerfuegbarkeit(false)}
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

// Define prop types for the ZimmerAddPage component to ensure that the correct props are passed to the component
ZimmerAddPage.propTypes = {
    addHotelzimmerSubmit: propTypes.func.isRequired
};

export default ZimmerAddPage;