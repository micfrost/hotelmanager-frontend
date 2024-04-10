import ZimmerSingle from './ZimmerSingle.jsx';
import {useState, useEffect} from "react";
import Spinner from "./Spinner";

const ZimmerList = () => {

    // State to store fetched data, empty array as initial value in order to avoid errors
    const [hotelzimmerData, setHotelzimmerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to store filter data
    const [selectedZimmernummer, setSelectedZimmernummer] = useState('');
    const [filterMinibar, setFilterMinibar] = useState(false);
    const [selectedZimmergroesse, setSelectedZimmergroesse] = useState('alle');
    const [selectedVerfuegbarkeit, setSelectedVerfuegbarkeit] = useState('alle');

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
        if (selectedZimmernummer && hotelzimmer.zimmernummer !== Number(selectedZimmernummer)) {return false;}
        if (selectedZimmergroesse !== 'alle' && hotelzimmer.zimmergroesse !== selectedZimmergroesse) {return false;}
        if (filterMinibar && !hotelzimmer.minibar) {return false;}
        if (selectedVerfuegbarkeit === 'frei' && !hotelzimmer.frei) {return false;}
        if (selectedVerfuegbarkeit === 'belegt' && hotelzimmer.frei) {return false;}
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
                        <label htmlFor="zimmernummerSelect" className="text-sky-50 mr-2">Zimmer-Auswahl</label>
                        <select
                            id="zimmernummerSelect"
                            value={selectedZimmernummer}
                            onChange={(e) => setSelectedZimmernummer(e.target.value)}
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
                        <label htmlFor="zimmergroesseSelect" className="text-sky-50 mr-2">Zimmergröße</label>
                        <select
                            id="zimmergroesseSelect"
                            onChange={(e) => setSelectedZimmergroesse(e.target.value)}
                            className="rounded w-38"
                        >
                            <option value="alle">Alle</option>
                            <option value="EINZELZIMMER">Einzelzimmer</option>
                            <option value="DOPPELZIMMER">Doppelzimmer</option>
                            <option value="SUITE">Suite</option>
                        </select>
                    </div>

                    {/* Minibar Filter */}
                    <div className="mb-4">
                        <label htmlFor="minibarFilter" className="text-sky-50 mr-2">Nur Zimmer mit einer Minibar </label>
                        <input
                            type="checkbox"
                            id="minibarFilter"
                            checked={filterMinibar}
                            onChange={(e) => setFilterMinibar(e.target.checked)}
                            className="rounded"
                        />
                    </div>

                    {/* Verfuegbarkeit Status Filter */}
                    <div className="mb-4">
                        <label className="text-sky-50 mr-4">Verfügbarkeit</label>
                        <label htmlFor="verfuegbarkeitAlle" className="text-sky-50 mr-2">
                            <input
                                type="radio"
                                id="verfuegbarkeitAlle"
                                name="verfuegbarkeitFilter"
                                value="alle"
                                checked={selectedVerfuegbarkeit === 'alle'}
                                onChange={() => setSelectedVerfuegbarkeit('alle')}
                                className="align-middle mr-1"
                            />
                            Alle
                        </label>
                        <label htmlFor="frei" className="text-sky-50 mr-2">
                            <input
                                type="radio"
                                id="frei"
                                name="verfuegbarkeitFilter"
                                value="frei"
                                checked={selectedVerfuegbarkeit === 'frei'}
                                onChange={() => setSelectedVerfuegbarkeit('frei')}
                                className="align-middle mr-1"
                            />
                            Frei
                        </label>
                        <label htmlFor="belegt" className="text-sky-50">
                            <input
                                type="radio"
                                id="belegt"
                                name="verfuegbarkeitFilter"
                                value="belegt"
                                checked={selectedVerfuegbarkeit === 'belegt'}
                                onChange={() => setSelectedVerfuegbarkeit('belegt')}
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
                                <ZimmerSingle key={hotelzimmer.zimmernummer} hotelzimmer={hotelzimmer}/>
                            ))}
                        </div>

                    )
                }
            </div>
        < /section>
    );
};

export default ZimmerList;