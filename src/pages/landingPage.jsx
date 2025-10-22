import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import hero from '../images/hero.jpg';
import necklace from '../images/necklace.jpg';
import shades from '../images/shades.jpg';
import watch from '../images/watch.jpg';
import bracelet from '../images/bracelet.jpg';
import brandface from '../images/faceofBrand.jpg';
import brandFace2 from '../images/brandface2.jpg';

export default function LandingPage(){
    const categories = [
        {
            id: 1,
            name: "Necklace",
            image: necklace,
        },
        {
            id: 2,
            name: "Watch",
            image: watch,
        },
        {
            id: 3,
            name: "Shade",
            image: shades,
        },
        {
            id: 4,
            name: "Bracelet",
            image: bracelet,
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return(
        <motion.div 
            className="bg-white font-serif"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/*the Hero section */}
            <motion.div className='relative bg-gray-50 font-serif my-5 p-5' variants={itemVariants}>
                <div className='absolute inset-0 bg-black/10'></div>
                <div
                style={{backgroundImage: `url(${hero})`}}
                className='w-full h-full object-cover object-center'
                >
                    <motion.div 
                        className='relative z-10 flex flex-col items-start justify-center h-[80vh] px-8 md:px-20'
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className='text-5xl pb-10 w-70'>Timestory Accessories for Everyone</h1>
                        <p className='mb-5'>Discover premium jewelry, shades & watches crafted for your unique style</p>
                      <Link to={'/products'}><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='bg-white rounded-lg px-4 py-2 hover:bg-gray-400 hover:text-white transition duration-200'>Shop Now</motion.button></Link>  
                    </motion.div>
                </div>
            </motion.div>

            {/* what we sell section */}
            <motion.div 
                className='py-10 bg-gray-100'
                variants={containerVariants}
            >
                <h2 className="text-4xl font-bold text-center mb-8">What We Sell</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10'>
                    {categories.map((item) => (
                        <motion.div key={item.id}
                            className='bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300'
                            variants={itemVariants}
                        >
                            <img src={item.image} alt={item.name}
                            className='w-full h-64 object-cover' />
                            <div className='p-6'>
                                <h3 className='text-gray-900 text-2xl font-bold text-center mb-4'>{item.name}</h3>
                                <Link to={'/products'} className="text-center">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-300'>
                                        Shop Now
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div className='grid sm:grid-cols-1 md:grid-cols-3 items-center md:bg-gray-200 p-5' variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <img src={brandface} alt="img" 
                    className='h-80 w-80 rounded-lg'
                    />
                </motion.div>
                <div className='text-center p-2'>
                    <h1 className='text-2xl'>Designed for Confidence.</h1>
                    <h1 className='text-xl'>Made for Everyone</h1>
                    <p className='text-lg'>A brand who's main aim is to bring out the hidden beauty of all genders</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <img src={brandFace2} alt="img" 
                    className='h-80 w-80 rounded-lg'
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}







