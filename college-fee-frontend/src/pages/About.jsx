import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function About() {
  const images = [
    "/img1.png",
    "/img2.png",
    "/img3.png",
    "/img4.png",
    "/img5.png",
    "/img6.png",
    "/img7.png",
  ];

  const [current, setCurrent] = useState(0);

  // Automatic slideshow every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden font-poppins">

      {/* Hero Section with Slideshow */}
      <section className="relative h-96 w-full flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: current === index ? 1 : 0 }}
              transition={{ duration: 1 }}
            />
          ))}
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 veil-gradient veil-noise veil-vignette"></div>
        </div>

        {/* Hero Text */}
        <motion.h1
          className="text-5xl sm:text-6xl font-bold text-white z-10 text-center italic-text px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Souravian University
        </motion.h1>
      </section>

      {/* Overview */}
      <section className="py-16 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="transparent-box mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6 italic-text">University Overview</h2>
            <p className="text-lg leading-relaxed text-center mb-4">
              Souravian University is a premier institution in Jharkhand, recognized by the UGC under Section 2(f). 
              Established with a vision to provide world-class education, the university offers diverse programs across 
              multiple disciplines in a campus spanning 60 acres in Jamshedpur.
            </p>
            <p className="text-lg leading-relaxed text-center mb-4">
              The university is committed to fostering academic excellence, innovative research, and holistic development 
              of students. It provides state-of-the-art facilities, experienced faculty, and a vibrant campus life that 
              encourages intellectual curiosity and critical thinking.
            </p>
            <p className="text-lg leading-relaxed text-center">
              Through partnerships with industry leaders and international institutions, Souravian University ensures that 
              students gain practical experience, global exposure, and the skills required to excel in a rapidly changing world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="transparent-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4 italic-text">Mission</h3>
            <p className="mb-2">
              Impart quality education, encourage research, and contribute to socio-economic development.
            </p>
            <p className="mb-2">
              Foster a culture of innovation and entrepreneurship among students to prepare them for real-world challenges.
            </p>
            <p>
              Promote inclusivity, ethical values, and social responsibility through academic programs and community engagement.
            </p>
          </motion.div>
          <motion.div
            className="transparent-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4 italic-text">Vision</h3>
            <p className="mb-2">
              Be a globally recognized institution nurturing curiosity, ethics, and excellence in students.
            </p>
            <p className="mb-2">
              Develop leaders who are capable of making meaningful contributions to society and the professional world.
            </p>
            <p>
              Encourage lifelong learning, innovation, and sustainability through research, collaboration, and technology.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
