"use client";

import { motion } from "framer-motion";
import {
  Download,
  MapPin,
  Calendar,
  Coffee,
  Terminal,
  Zap,
  Code2,
} from "lucide-react";

const About = () => {
  const stats = [
    {
      number: "3+",
      label: "YEARS_EXPERIENCE",
      icon: <Calendar className="w-5 h-5" />,
      color: "text-[#D4AF37]",
    },
    {
      number: "4",
      label: "PROJECTS_DEPLOYED",
      icon: <Coffee className="w-5 h-5" />,
      color: "text-[#B11226]",
    },
    {
      number: "∞",
      label: "CREATIVE_TECH",
      icon: <Code2 className="w-5 h-5" />,
      color: "text-[#D4AF37]",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      {/* Scanning lines effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#B11226] to-transparent"
          animate={{ y: [0, window.innerHeight || 800] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="cyber-text-shadow">ABOUT</span>
              <br />
              <span className="text-[#D4AF37] cyber-glow">THE_ARCHITECT</span>
              {/* Terminal cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[#B11226]"
              >
                █
              </motion.span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-gray-300 text-lg leading-relaxed font-mono"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="cyber-panel p-4">
                <p className="mb-2">
                  <span className="text-[#D4AF37]">&gt;</span>{" "}
                  INITIALIZING_PROFILE.exe
                </p>
                <p>
                  I am a{" "}
                  <span className="text-[#B11226] font-bold cyber-glow">
                    CREATIVE TECHNOLOGIST
                  </span>{" "}
                  working at the intersection of software development and digital art. My work blends frontend engineering, game development, 3D design, and music production to build interactive and immersive digital experiences.
                </p>
              </div>

              <div className="cyber-panel p-4">
                <p className="mb-2">
                  <span className="text-[#D4AF37]">&gt;</span>{" "}
                  LOADING_CAPABILITIES.dll
                </p>
                <p>
                  My focus is primarily on frontend development using modern web technologies, along with creating game environments and interactive systems in Unreal Engine. I also work with Blender for 3D content, FL Studio for music production and sound design, and DaVinci Resolve for visual editing and post-production.
                </p>
              </div>

              <div className="cyber-panel p-4">
                <p className="mb-2">
                  <span className="text-[#D4AF37]">&gt;</span>{" "}
                  RUNTIME_PHILOSOPHY.cfg
                </p>
                <p>
                  I enjoy experimenting with new tools, exploring real-time rendering, and building projects that combine technology with creativity. My goal is to continuously improve and expand across both development and digital media disciplines.
                  <span className="text-[#B11226]">
                    {" "}
                    CONTINUOUS_EVOLUTION = TRUE;
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cyber-panel text-center group"
                >
                  <div
                    className={`flex items-center justify-center ${stat.color} mb-2 group-hover:scale-110 transition-transform`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white font-mono cyber-glow">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs tracking-widest font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Download Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-black font-bold tracking-wider">
                  <Download size={20} />
                  DOWNLOAD_PROFILE.zip
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] group-hover:from-[#FFD700] group-hover:to-[#D4AF37] transition-all duration-300"></div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Avatar/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Avatar Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-full aspect-square overflow-hidden group"
              >
                {/* Profile Picture */}
                <img
                  src="/pfp2.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-yellow-500/50"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
