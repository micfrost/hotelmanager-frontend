// Define a functional component that returns a hero section
const Hero = () => {
    return (
        <section className='bg-sky-900 py-2 border-b border-sky-700'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
                <div className='text-center'>
                    <h1 className='my-4 text-4xl font-extrabold text-sky-100 sm:text-5xl md:text-6xl'>
                        HOTEL
                    </h1>
                    <p className='my-4 text-1xl text-sky-100 sm:text-2xl'>
                        EXXELLENT NIGHTS
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
