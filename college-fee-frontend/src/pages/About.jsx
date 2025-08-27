import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="">

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://srinathuniversity.ac.in/wp-content/uploads/2023/07/Website-Slider-scaled.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-srinathRed/60"></div>
        <motion.h1
          className="text-5xl sm:text-6xl font-bold text-white z-10 text-center pt-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Srinath University
        </motion.h1>
      </section>

      {/* Overview */}
      <section className="py-16 bg-srinathLightRed/10 text-srinathRed">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            University Overview
          </motion.h2>
          <motion.p
            className="text-lg text-gray-800 leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Srinath University is a premier institution in Jharkhand, recognized
            by the UGC under Section 2(f). Established with a vision to provide
            world-class education, the university offers diverse programs across
            multiple disciplines in a campus spanning 60 acres in Jamshedpur.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-srinathRed">Mission</h3>
            <p className="text-gray-800">
              Impart quality education, encourage research, and contribute to
              socio-economic development.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-srinathRed">Vision</h3>
            <p className="text-gray-800">
              Be a globally recognized institution nurturing curiosity, ethics,
              and excellence in students.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
