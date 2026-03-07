"use client";

import { motion } from "framer-motion";
import { Heart, Terminal } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B11226] to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              className="text-2xl font-bold cyber-glow cursor-pointer w-fit font-mono tracking-wider"
            >
              <span className="text-[#D4AF37]">&lt;</span>
              <span className="text-white">ABHIJITH</span>
              <span className="text-[#B11226]">_</span>
              <span className="text-white">KRISHNAN</span>
              <span className="text-[#D4AF37]">/&gt;</span>
            </motion.div>
            <div className="cyber-panel inline-block px-4 py-2">
              <p className="text-gray-400 text-sm leading-relaxed font-mono">
                <span className="text-[#D4AF37]">&gt;</span> Creative
                technologist crafting digital realities through code, games, 3D
                art, and sound synthesis.
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold font-mono tracking-wider cyber-text-shadow">
              <span className="text-[#B11226]">&gt;</span> NAVIGATION.sys
            </h3>
            <div className="space-y-2">
              {[
                { name: "HOME", id: "hero" },
                { name: "PROJECTS", id: "projects" },
                { name: "SKILLS", id: "skills" },
                { name: "ABOUT", id: "about" },
                { name: "CONTACT", id: "contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 5, color: "#D4AF37" }}
                  onClick={() => {
                    const element = document.getElementById(item.id);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-gray-400 hover:text-[#D4AF37] transition-all duration-300 text-sm font-mono"
                >
                  <span className="text-[#B11226]">└─</span> {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* System Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold font-mono tracking-wider cyber-text-shadow">
              <span className="text-[#D4AF37]">&gt;</span> SYSTEM.log
            </h3>
            <div className="cyber-panel p-4 space-y-2 text-sm font-mono">
              <motion.div
                whileHover={{ x: 5 }}
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300"
              >
                <Terminal className="inline w-3 h-3 mr-2" />
                <a href="mailto:abhijithkrishnan14@gmail.com">
                  EMAIL_PROTOCOL.exe
                </a>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-gray-400 hover:text-[#B11226] transition-all duration-300"
              >
                <Terminal className="inline w-3 h-3 mr-2" />
                <a
                  href="https://github.com/Rectrix-21/portfolio-site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SOURCE_CODE.git
                </a>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300"
              >
                <Terminal className="inline w-3 h-3 mr-2" />
                <a
                  href="https://linkedin.com/in/rectrix"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NETWORK.link
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-[#D4AF37]/30 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm font-mono">
            <span className="text-[#D4AF37]">&copy;</span>
            <span>2026 ABHIJITH_KRISHNAN.exe</span>
            <span className="text-[#B11226]">|</span>
            <span>Crafted with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                filter: [
                  "hue-rotate(0deg)",
                  "hue-rotate(360deg)",
                  "hue-rotate(0deg)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-[#B11226] fill-current" />
            </motion.div>
            <span>& Next.js</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{
              y: -2,
              boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="cyber-button-small bg-gradient-to-r from-[#D4AF37] to-[#B11226] text-white font-mono"
          >
            <Terminal className="w-4 h-4 mr-2" />
            BOOT_TO_TOP ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
