import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ZimmerSearch = () => {
    // State to store fetched data, empty array as initial value in order to avoid errors
    const [hotelzimmerData, setHotelzimmerData] = useState([]);
    const [error, setError] = useState(null);

    // State to store filter data
    const [searchRoomNumber, setSearchRoomNumber] = useState('');
    const [searchRoomNumberError, setSearchRoomNumberError] = useState('');

    // URL for detail page navigation
    const detailPageUrl = searchRoomNumber ? `/hotelzimmer/${searchRoomNumber}` : '#';

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


    const existingZimmernummern = hotelzimmerData.map(hz => hz.zimmernummer);
    // Validate search room number
    const validateSearchRoomNumber = (value) => {
        if (value && (isNaN(value) || Number(value) <= 0)) {
            setSearchRoomNumberError('Zimmer existiert nicht');
            return false;
        }

        if (!existingZimmernummern.includes(Number(value))) {
            setSearchRoomNumberError('Zimmer existiert nicht');
            return false;
        }

        setSearchRoomNumberError('');
        return true;
    };

    const handleSearchRoomNumberChange = (e) => {
        const value = e.target.value;
        setSearchRoomNumber(value);
        validateSearchRoomNumber(value);
    };

    if (error) {
        return <div className="text-center mt-5">Error: {error.message}. <button onClick={() => window.location.reload()}>Retry</button></div>;
    }

    return (
       <div>
                {/* Search the zimmernummer */}
                <div className="flex items-center pt-2 ">
                    {searchRoomNumberError && <p className=" text-white pt-1">{searchRoomNumberError}</p>}
                    <label htmlFor="searchRoomNumber" className="text-sky-50 mr-2 "></label>
                    <input
                        type="text"
                        id="searchRoomNumber"
                        value={searchRoomNumber}
                        onChange={handleSearchRoomNumberChange}
                        placeholder="Nr."
                        className="rounded w-10 pt-1  px-2 text-center "
                    />
                    <Link to={detailPageUrl}
                          className="h-[36px] bg-sky-700 hover:bg-yellow-500  text-white px-1 pt-2 rounded-lg text-center mx-2"

                    disabled={!searchRoomNumber || searchRoomNumberError}>
                        SUCHEN
                    </Link>

                </div>


     </div>
    );
};

export default ZimmerSearch;
