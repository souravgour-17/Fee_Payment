import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
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

  // Automatic slideshow every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden font-poppins">

      {/* Floating Animated Circles Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 blur-xl"
            style={{
              width: Math.random() * 100 + 40,
              height: Math.random() * 100 + 40,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: current === index ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.h1
          className="text-5xl sm:text-6xl font-bold text-white z-10 text-center px-4 italic-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Souravian University
        </motion.h1>
        <motion.p
          className="text-white/80 text-lg sm:text-xl mt-4 z-10 text-center max-w-2xl px-4 italic-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Excellence in education, research, and innovation. Explore our campus, courses, and student life.
        </motion.p>
      </section>

      {/* Overview / History Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <motion.img
            src="https://i.pinimg.com/1200x/37/b0/03/37b003811276655d429e53d17c2c6b05.jpg"
            alt="Campus"
            className="w-full md:w-1/2 rounded-2xl shadow-lg transparent-box"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="w-full md:w-1/2 transparent-box p-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4 italic-text text-white">Overview & History</h2>
            <p className="text-white mb-4">
              Established with a vision to deliver world-class education, Souravian University has emerged as a center of academic excellence. With a focus on innovation, research, and holistic development, the university equips students to thrive in a global environment.
            </p>
            <p className="text-white">
              Our campus boasts modern classrooms, advanced laboratories, extensive library resources, and vibrant extracurricular opportunities, creating an inspiring environment for learning and growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 italic-text text-white">Campus Life & Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "https://i.pinimg.com/736x/52/50/ab/5250ab493ee9553d8033352359adc3f1.jpg",
              "https://i.pinimg.com/736x/18/d1/4d/18d14dcfa2d2dbbbc927e6ba6f239570.jpg",
              "https://i.pinimg.com/736x/64/77/b0/6477b0b9713964798332982278484f26.jpg",
              "https://i.pinimg.com/736x/6b/70/b6/6b70b612a8c63a2e88bf38bc4707e468.jpg",
              "https://i.pinimg.com/1200x/48/bb/b7/48bbb7b022c39fd35563e36cea76101c.jpg"
            ].map((url, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden shadow-lg transparent-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-48 object-cover rounded-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 text-center relative z-10">
        <motion.div className="transparent-box p-8 mx-6 md:mx-auto max-w-3xl rounded-xl">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6 italic-text text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Join Souravian University Today 🎓✨
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Explore our diverse programs, innovative courses, and vibrant campus life 🌱📚.
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Connect with passionate professors and make lifelong friends 🤝💡.
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Participate in exciting research projects, workshops, and campus events 🔬🎨🎶.
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Begin your journey toward excellence, leadership, and global success 🌍🚀.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
