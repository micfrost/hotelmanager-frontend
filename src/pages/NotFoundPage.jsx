import {Link} from 'react-router-dom';
import {FaExclamationTriangle} from 'react-icons/fa';

// Define the NotFoundPage functional component with a 404 Not Found page
const NotFoundPage = () => {

    // Render the 404 Not Found page
    return (
        <section className='text-center flex flex-col justify-center items-center h-screen '>

            {/* Exclamation triangle icon */}
            <FaExclamationTriangle className='text-sky-700 text-6xl mb-4'/>

            <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
            <p className='text-xl mb-5'>This page does not exist</p>
            <Link
                to='/'
                className='text-sky-100 bg-sky-700 hover:bg-yellow-500 rounded-md px-3 py-2 mt-4'
            >
                Home
            </Link>
        </section>
    );
};
export default NotFoundPage;
