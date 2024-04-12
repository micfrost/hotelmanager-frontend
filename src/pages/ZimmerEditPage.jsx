import {useState} from 'react';
import {useNavigate, useLoaderData} from 'react-router-dom';
import propTypes from 'prop-types';

// Define the ZimmerEditPage functional component that renders a form to edit an existing hotelzimmer
const ZimmerEditPage = ({updateHotelzimmerSubmit}) => {

        // Fetch the hotelzimmer data from the loader data hook
        const hotelzimmer = useLoaderData();

        // Navigate Hook to navigate to a different route
        const navigate = useNavigate();

        // Enum to display name mapping (for displaying in the dropdown)
        const zimmergroessenDisplay = {
            'EINZELZIMMER': 'Einzelzimmer',
            'DOPPELZIMMER': 'Doppelzimmer',
            'SUITE': 'Suite'
        };

        // Set initial state using the enum value
        const [zimmergroesse, setZimmergroesse] = useState(zimmergroessenDisplay[hotelzimmer.zimmergroesse]);
        const [minibar, setMinibar] = useState(hotelzimmer.minibar);
        const [verfuegbarkeit, setVerfuegbarkeit] = useState(hotelzimmer.verfuegbarkeit);

        // Handler function to submit the form data
        const handleSubmit = async (e) => {
            e.preventDefault();

            // Find the enum value for the selected zimmergroesse
            const enumValue = Object.keys(zimmergroessenDisplay).find(key => zimmergroessenDisplay[key] === zimmergroesse);

            // Create an updated hotelzimmer object with the new values
            const updatedHotelzimmer = {
                zimmernummer: hotelzimmer.zimmernummer,
                zimmergroesse: enumValue,
                minibar,
                verfuegbarkeit
            };
            try {
                await updateHotelzimmerSubmit(updatedHotelzimmer);

                // Display success message after update is successful
                if (document.getElementById('success-message')) {
                    document.getElementById('success-message').remove();
                }
                const successMessage = document.createElement('p');
                successMessage.id = 'success-message';
                successMessage.textContent = 'Erledigt. Weiterleitung...';
                successMessage.classList.add('text-green-700', 'text-center', 'mb-4', 'font-bold');
                document.querySelector('form').insertAdjacentElement('afterend', successMessage);

                // Wait for 3 seconds before redirecting to the hotelzimmer page
                await new Promise(resolve => setTimeout(resolve, 3000));
                navigate('/hotelzimmer');
            } catch (error) {
                console.error('Hotelzimmer wurde nicht geändert', error);
            }
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
                                {Object.values(zimmergroessenDisplay).map((display, index) => (
                                    <option key={index} value={display}>{display}</option>
                                ))}
                            </select>
                        </div>

                        {/* Minibar Field */}
                        <div className='mb-4'>
                            <label htmlFor='minibar' className='inline mb-2 mr-2'>
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

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className="h-[36px] bg-sky-700 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-center text-sm mr-2"
                        >
                            Update Hotelzimmer
                        </button>
                    </form>
                </div>
            </section>
        );
    }
;

// Define the prop types for the component to ensure that the correct props are passed to the component
ZimmerEditPage.propTypes = {
    updateHotelzimmerSubmit: propTypes.func.isRequired
};

export default ZimmerEditPage;
