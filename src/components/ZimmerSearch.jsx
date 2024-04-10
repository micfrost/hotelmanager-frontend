import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';

// Define the functional component that returns a search input for zimmernummer
const ZimmerSearch = () => {

    // State to store fetched data and error, empty array as initial value for hotelzimmerData state variable
    const [hotelzimmerData, setHotelzimmerData] = useState([]);
    const [error, setError] = useState(null);


    // State to store filter data for zimmernummer
    const [searchZimmernummer, setSearchZimmernummer] = useState('');
    const [searchZimmernummerError, setSearchZimmernummerError] = useState('');


    // URL for detail page navigation
    const detailPageUrl = searchZimmernummer ? `/hotelzimmer/${searchZimmernummer}` : '#';


    // Fetch data from the API to fill the hotelzimmerData state
    useEffect(() => {
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

            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
                setError(error);
            });
    }, []);


    // Get existing zimmernummern from the fetched data
    const existingZimmernummern = hotelzimmerData.map(hz => hz.zimmernummer);

    // Validate search room number
    const validateSearchZimmernummer = (value) => {
        if (value && (isNaN(value) || Number(value) <= 0)) {
            setSearchZimmernummerError('Zimmer existiert nicht');
            return false;
        }
        if (!existingZimmernummern.includes(Number(value))) {
            setSearchZimmernummerError('Zimmer existiert nicht');
            return false;
        }
        setSearchZimmernummerError('');
        return true;
    };

    // Handler function to update the searchZimmernummer state variable
    const handleSearchZimmernummerChange = (e) => {
        const value = e.target.value;
        setSearchZimmernummer(value);
        validateSearchZimmernummer(value);
    };


    // Render error message if there is an error fetching data from the API or reload the page
    if (error) {
        return <div className="text-center mt-5">Error: {error.message}. <button
            onClick={() => window.location.reload()}>Retry</button></div>;
    }


    // Render the search input for zimmernummer
    return (
        <div>
            {/* Search the zimmernummer */}
            <div className="flex items-center pt-2 ">
                {searchZimmernummerError && <p className=" text-yellow-500 font-bold pt-1">{searchZimmernummerError}</p>}
                <label htmlFor="searchZimmernummer" className="text-sky-50 mr-2 "></label>
                <input
                    type="text"
                    id="searchZimmernummer"
                    value={searchZimmernummer}
                    onChange={handleSearchZimmernummerChange}
                    placeholder="Nr."
                    className="rounded w-10 pt-1  px-2 text-center "
                />
                <Link to={detailPageUrl}
                      className="h-[36px] bg-sky-700 hover:bg-yellow-500  text-white px-1 pt-2 rounded-lg text-center mx-2"
                      disabled={!searchZimmernummer || searchZimmernummerError}>
                    SUCHEN
                </Link>
            </div>
        </div>
    );
};

export default ZimmerSearch;
