import ZimmerCard from './ZimmerCard.jsx';
import {useState, useEffect} from "react";
import Spinner from "./Spinner";

const ZimmerList = () => {

    // State to store fetched data, empty array as initial value in order to avoid errors
    const [hotelzimmerData, setHotelzimmerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to store filter data
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const [filterMinibar, setFilterMinibar] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState('all');
    const [selectedAvailability, setSelectedAvailability] = useState('all');

    // Fetch data from the API to fill the hotelzimmerData state
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

    // sort the data
    const sortedHotelzimmerData = hotelzimmerData.sort((a, b) => a.zimmernummer - b.zimmernummer);

    // Apply filters to the hotelzimmer data
    let listeAnzeigen = sortedHotelzimmerData.filter(hotelzimmer => {
        if (selectedRoomNumber && hotelzimmer.zimmernummer !== Number(selectedRoomNumber)) {return false;}
        if (selectedRoomType !== 'all' && hotelzimmer.zimmergroesse !== selectedRoomType) {return false;}
        if (filterMinibar && !hotelzimmer.minibar) {return false;}
        if (selectedAvailability === 'available' && !hotelzimmer.frei) {return false;}
        if (selectedAvailability === 'occupied' && hotelzimmer.frei) {return false;}
        return true;
    });

    if (error) {
        return <div className="text-center mt-5">Error: {error.message}. <button
            onClick={() => window.location.reload()}>Retry</button></div>;
    }


    return (
        <section className="bg-sky-900 px-4 py-10 min-h-screen">
            <div className="container-xl lg:container m-auto">

                <div className="text-3xl font-bold text-sky-50 mb-6 text-center ">HOTELZIMMER</div>

                <div className="mb-6 text-center">
                    {/* Dropdown to select zimmernummer */}
                    <div className="mb-4">
                        <label htmlFor="roomNumberSelect" className="text-sky-50 mr-2">Zimmer-Auswahl</label>
                        <select
                            id="roomNumberSelect"
                            value={selectedRoomNumber}
                            onChange={(e) => setSelectedRoomNumber(e.target.value)}
                            className="rounded w-28"
                        >
                            <option value="">Alle</option>
                            {hotelzimmerData.map(hotelzimmer => (
                                <option key={hotelzimmer.zimmernummer} value={hotelzimmer.zimmernummer}>
                                    {hotelzimmer.zimmernummer}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Room Type Filter */}
                    <div className="mb-4">
                        <label htmlFor="roomTypeSelect" className="text-sky-50 mr-2">Zimmergröße</label>
                        <select
                            id="roomTypeSelect"
                            onChange={(e) => setSelectedRoomType(e.target.value)}
                            className="rounded w-38"
                        >
                            <option value="all">Alle</option>
                            <option value="Einzelzimmer">Einzelzimmer</option>
                            <option value="Doppelzimmer">Doppelzimmer</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>

                    {/* Minibar Filter */}
                    <div className="mb-4">
                        <label htmlFor="minibarFilter" className="text-sky-50 mr-2">Minibar vorhanden </label>
                        <input
                            type="checkbox"
                            id="minibarFilter"
                            checked={filterMinibar}
                            onChange={(e) => setFilterMinibar(e.target.checked)}
                            className="rounded"
                        />
                    </div>

                    {/* Availability Status Filter */}
                    <div className="mb-4">
                        <label className="text-sky-50 mr-4">Verfügbarkeit</label>
                        <label htmlFor="availableAll" className="text-sky-50 mr-2">
                            <input
                                type="radio"
                                id="availableAll"
                                name="availabilityFilter"
                                value="all"
                                checked={selectedAvailability === 'all'}
                                onChange={() => setSelectedAvailability('all')}
                                className="align-middle mr-1"
                            />
                            Alle
                        </label>
                        <label htmlFor="available" className="text-sky-50 mr-2">
                            <input
                                type="radio"
                                id="available"
                                name="availabilityFilter"
                                value="available"
                                checked={selectedAvailability === 'available'}
                                onChange={() => setSelectedAvailability('available')}
                                className="align-middle mr-1"
                            />
                            Frei
                        </label>
                        <label htmlFor="occupied" className="text-sky-50">
                            <input
                                type="radio"
                                id="occupied"
                                name="availabilityFilter"
                                value="occupied"
                                checked={selectedAvailability === 'occupied'}
                                onChange={() => setSelectedAvailability('occupied')}
                                className="align-middle mr-1"
                            />
                            Belegt
                        </label>
                    </div>
                </div>


                {loading ?
                    (<Spinner loading={loading}/>
                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {listeAnzeigen.map(hotelzimmer => (
                                <ZimmerCard key={hotelzimmer.zimmernummer} hotelzimmer={hotelzimmer}/>
                            ))}
                        </div>

                    )
                }
            </div>
        < /section>
    );
};

export default ZimmerList;