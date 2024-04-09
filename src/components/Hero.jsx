import PropTypes from 'prop-types';

const Hero = ({ title, subtitle }) => {
    return (
        <section className='bg-sky-900 py-2 border-b border-sky-700'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
                <div className='text-center'>
                    <h1 className='my-4 text-4xl font-extrabold text-yellow-500 sm:text-5xl md:text-6xl'>
                        {title}
                    </h1>
                    <p className='my-4 text-1xl text-yellow-500 sm:text-2xl'>{subtitle}</p>
                </div>
            </div>
        </section>
    );
};

Hero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

Hero.defaultProps = {
    title: 'HOTEL',
    subtitle: 'EXXELLENT NIGHTS'
};

export default Hero;
