import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaUsers } from 'react-icons/fa';
import ceoImage from '../images/ceo.JPG';
import heroImage from '../images/ceo.jpg';

const AboutUs = () => {
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

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <motion.div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.h1
            className="text-5xl font-bold text-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            About Timestory
          </motion.h1>
        </div>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Our Story Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            The story of Timestory begins with a simple yet profound joy: the delight in seeing people radiate confidence. Our CEO, a visionary with a passion for style, founded this brand on the belief that true elegance comes from feeling good in what you wear. It’s not just about the clothes or the accessories; it’s about the story they tell and the confidence they inspire. Timestory is a testament to uniqueness, a narrative of quality, and a celebration of individual style. We are here to help you write your own story, one timeless piece at a time.
          </p>
        </motion.section>

        {/* Our Mission & Vision Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center mb-8">Our Mission & Vision</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg text-center">
              <FaBullseye className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p>To redefine luxury by making it accessible, sustainable, and a force for good. We are committed to fulfilling the Sustainable Development Goals (SDGs) by offering products that are not only beautiful but also ethically made.</p>
            </div>
            <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg text-center">
              <FaEye className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
              <p>To be a global leader in conscious luxury, inspiring a movement where style and substance coexist. We envision a world where everyone can look and feel their best, knowing their choices make a positive impact.</p>
            </div>
            <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg text-center">
              <FaUsers className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Our Goal</h3>
              <p>To bring out the best in everyone's look. We aim to provide our customers with the pieces that complete their look and empower them to express their unique identity with confidence and flair.</p>
            </div>
          </div>
        </motion.section>

        {/* Meet the CEO Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center mb-8">Meet the CEO</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.img
              src={ceoImage}
              alt="CEO of Timestory"
              className="w-64 h-64 rounded-full object-cover shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <div className="max-w-lg text-center md:text-left">
              <h3 className="text-3xl font-bold">The Lone Wolf</h3>
              <p className="text-xl text-gray-600 mb-4">Founder & CEO</p>
              <p className="text-lg">
                As the driving force behind Timestory, our CEO is a "lone wolf" in the brand's growth, personally overseeing every detail to ensure it aligns with his vision. His dedication stems from a deep-seated passion for helping people discover their best selves through fashion. With a keen eye for quality and a heart for sustainable practices, he is building a legacy of luxury with a purpose.
              </p>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default AboutUs;
