import {useState} from 'react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

// eslint-disable-next-line react/prop-types
const ZimmerEditPage = ({updateHotelzimmerSubmit}) => {
    // Loading the initial hotelzimmer data using useLoaderData
    const hotelzimmer = useLoaderData();
    const [zimmergroesse, setZimmergroesse] = useState(hotelzimmer.zimmergroesse);
    const [minibar, setMinibar] = useState(hotelzimmer.minibar);
    const [verfuegbarkeit, setVerfuegbarkeit] = useState(hotelzimmer.frei ? 'frei' : 'belegt');
    const zimmergroessenOptions = ['Einzelzimmer', 'Doppelzimmer', 'Suite'];

    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedHotelzimmer = {
            zimmernummer: hotelzimmer.zimmernummer,
            zimmergroesse,
            minibar,
            frei: verfuegbarkeit
        };

        // Submit the updated hotelzimmer details
        updateHotelzimmerSubmit(updatedHotelzimmer);

        navigate(`/hotelzimmer`);
        window.location.reload();
toast.success('Hotelzimmer erfolgreich geändert');
    };

    return (
        <section className="bg-sky-900 px-4 py-10 h-screen flex flex-col items-center">
            <h2 className='text-3xl font-bold text-center mb-4 text-white'>HOTELZIMMER</h2>


            <div className='bg-white p-8 rounded-lg shadow-md'>
                <div className='text-2xl font-bold mt-2 mb-2'>
                    Zimmer ändern
                </div>
                <div className="border border-gray-100 mb-5"></div>

                <form onSubmit={handleSubmit}>


                    {/* Zimmergroesse Dropdown */}
                    <div className='mb-4'>
                        <label htmlFor='zimmergroesse' className='block  mb-2'>
                            Zimmergröße
                        </label>
                        <select
                            id='zimmergroesse'
                            value={zimmergroesse}
                            onChange={(e) => setZimmergroesse(e.target.value)}
                            className='border rounded w-full py-2 px-3'
                            required
                        >
                            {zimmergroessenOptions.map((option, index) => (
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
                        <label className='block  mb-2'>Verfügbarkeit</label>
                        <label htmlFor='frei' className='inline  mr-2'>
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
                                checked={verfuegbarkeit === 'belegt'}
                                onChange={() => setVerfuegbarkeit('belegt')}
                                className='align-middle mr-1'
                            />
                            Belegt
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            className="h-[36px] bg-sky-700 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-center text-sm mr-2"
                            type='submit'
                        >
                            Update Hotelzimmer
                        </button>
                    </div>
                </form>

            </div>
        </section>
    )
        ;
};

export default ZimmerEditPage;
