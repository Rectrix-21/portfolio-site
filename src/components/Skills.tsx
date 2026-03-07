"use client";

import { motion } from "framer-motion";
import {
  Code,
  Server,
  Palette,
  Music,
  Smartphone,
  Cpu,
  Database,
  Gamepad2,
  Headphones,
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-8 h-8" />,
      skills: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Next.js" },
        { name: "HTML" },
        { name: "Tailwind CSS" }
      ],
      color: "from-[#D4AF37] to-[#FFD700]",
      glowColor: "shadow-[#D4AF37]/50",
    },
    {
      title: "Backend / Programming",
      icon: <Server className="w-8 h-8" />,
      skills: [
        { name: "Node.js" },
        { name: "SQL" },
        { name: "C++" },
        { name: "REST APIs" }
      ],
      color: "from-[#B11226] to-[#DC143C]",
      glowColor: "shadow-[#B11226]/50",
    },
    {
      title: "Creative Tools",
      icon: <Palette className="w-8 h-8" />,
      skills: [
        { name: "Blender" },
        { name: "Unreal Engine" },
        { name: "DaVinci Resolve" },
        { name: "3D Animation" },
        { name: "Environment Design" }
      ],
      color: "from-[#D4AF37] to-[#B11226]",
      glowColor: "shadow-[#D4AF37]/30",
    },
    {
      title: "Music Production",
      icon: <Music className="w-8 h-8" />,
      skills: [
        { name: "FL Studio" },
        { name: "Sound Design" },
        { name: "Mixing & Mastering" },
        { name: "Composition" }
      ],
      color: "from-[#B11226] to-[#D4AF37]",
      glowColor: "shadow-[#B11226]/40",
    },
    {
      title: "App Development",
      icon: <Smartphone className="w-8 h-8" />,
      skills: [
        { name: "React Native" },
        { name: "Expo" },
        { name: "Mobile App Development" }
      ],
      color: "from-[#D4AF37] to-[#B11226]",
      glowColor: "shadow-[#D4AF37]/40",
    }
  ];

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          animate={{
            x: [
              -100,
              typeof window !== "undefined" ? window.innerWidth + 100 : 1000,
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#B11226] to-transparent"
          animate={{
            x: [
              typeof window !== "undefined" ? window.innerWidth + 100 : 1000,
              -100,
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-4 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="cyber-text-shadow">SKILLS &</span>
            <br />
            <span className="text-[#D4AF37] cyber-glow">EXPERTISE</span>
            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[#B11226]"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[#D4AF37]"></div>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ADVANCED TECHNICAL CAPABILITIES ACROSS MULTIPLE DOMAINS
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 0 30px ${category.glowColor.includes("D4AF37") ? "rgba(212, 175, 55, 0.3)" : "rgba(177, 18, 38, 0.3)"}`,
              }}
              className="cyber-panel group relative overflow-hidden"
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#B11226]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Category Header */}
              <div className="flex items-center mb-6 relative z-10">
                <motion.div
                  whileHover={{ rotate: 15, scale: .9 }}
                  transition={{ duration: 0.6 }}
                  className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-black mr-4 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white tracking-wider cyber-text-shadow">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="flex items-center gap-3 group/item"
                  >
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 90 }}
                      className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-sm shrink-0`}
                    />
                    <span className="text-gray-300 font-medium tracking-wide group-hover/item:text-[#D4AF37] transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#B11226] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="cyber-panel inline-block px-8 py-4">
            <p className="text-gray-300 text-lg tracking-wider font-mono">
              <span className="text-[#D4AF37]">&gt;</span>{" "}
              CONTINUOUSLY_UPGRADING.EXE
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[#B11226]"
              >
                _
              </motion.span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
