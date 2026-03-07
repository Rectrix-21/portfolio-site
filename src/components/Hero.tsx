"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-red-600/5"></div>
        </div>

        {/* Floating geometric shapes */}
        {typeof window !== "undefined" &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-yellow-500/20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
              }}
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
                rotate: Math.random() * 360,
              }}
              animate={{
                y: [0, -200, 0],
                rotate: [0, 360, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}

        {/* Neon particles */}
        {typeof window !== "undefined" &&
          [...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-yellow-500 rounded-full"
              style={{
                boxShadow: "0 0 6px #D4AF37, 0 0 12px #D4AF37",
              }}
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 font-mono tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="text-yellow-500 text-glow-gold block"
              animate={{
                textShadow: [
                  "0 0 20px #D4AF37",
                  "0 0 30px #D4AF37, 0 0 40px #D4AF37",
                  "0 0 20px #D4AF37",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ABHIJITH
            </motion.span>
            <motion.span
              className="text-white block mt-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              KRISHNAN
            </motion.span>
          </motion.h1>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-lg md:text-xl text-gray-300 font-mono tracking-wide uppercase space-y-2">
              <motion.div
                className="text-red-600"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &gt; SOFTWARE_DEVELOPER
              </motion.div>
              <motion.div
                className="text-yellow-500"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                &gt; GAME_DEVELOPER
              </motion.div>
              <motion.div
                className="text-gray-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                &gt; 3D_ARTIST
              </motion.div>
              <motion.div
                className="text-red-600"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                &gt; MUSIC_PRODUCER
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto font-mono"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            // Creative technologist crafting digital realities
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 30px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 font-mono font-bold tracking-wider uppercase hover:bg-yellow-500/10 transition-all duration-300 relative group animated-border"
            >
              <span className="relative z-10">VIEW_PROJECTS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 30px rgba(177, 18, 38, 0.5), inset 0 0 20px rgba(177, 18, 38, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-transparent border-2 border-red-600 text-red-600 font-mono font-bold tracking-wider uppercase hover:bg-red-600/10 transition-all duration-300 relative group"
            >
              <span className="relative z-10">CONTACT_ME</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.button
          onClick={() => scrollToSection("projects")}
          className="text-yellow-500 hover:text-yellow-400 transition-colors cursor-pointer border border-yellow-500/30 p-2 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
