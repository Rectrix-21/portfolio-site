"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "KeyTone - Audio to MIDI Converter",
      description:
        "Browser-based music production toolkit that transcribes melody and chords from any song into MIDI in about a minute. Includes AI-assisted chord improvement, MIDI generation, track analysis, and BPM/key tools, backed by KeyTone Studio, a Windows/macOS Electron companion app that runs Demucs stem separation locally.",
      techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Python API",
        "Electron",
      ],
      imageUrl: "/keytone.png",
      liveUrl: "https://keytonestudio.com",
      githubUrl: "https://github.com/Rectrix-21/KeyTone",
    },
    {
      title: "Interactive Game Website",
      description:
        "Interactive game website featuring Marvel characters, built with React and Next.js. Integrates Marvel API for dynamic content and character data.",
      techStack: [
        "React",
        "Next.js",
        "Marvel API",
        "TypeScript",
        "Tailwind CSS",
      ],
      imageUrl: "/marvel-site.png",
      liveUrl: "https://www.marvelversed.com",
      githubUrl: "https://github.com/Rectrix-21/marvelverse",
    },
    {
      title: "The Sin Beneath - Unreal Engine",
      description:
        "Psychological horror game inspired by Silent Hill, built in Unreal Engine 5. Features MetaHuman character with custom first-person clothing, interactive bedroom environment, functional systems for lighting, object inspection, and door interactions. Currently developing inventory system.",
      techStack: [
        "Unreal Engine 5",
        "MetaHuman Creator",
        "Blueprints",
        "C++",
        "Sound Design",
      ],
      imageUrl: "/horror-game.png",
      liveUrl: "/video/silent-hill-game", // Video showcase page
      githubUrl: "", // No GitHub
    },
    {
      title: "Music Production",
      description:
        "Independent music producer creating indie pop, R&B, and electronic genre tracks. Features released music on streaming platforms and a custom web player for unreleased demos and experimental tracks.",
      techStack: ["FL Studio", "React", "Web Audio API", "Audio Production"],
      imageUrl: "/pfp.png",
      liveUrl: "/music-player", // Custom music player for demos
      githubUrl: "", // No GitHub for music
    },
    {
      title: "Sound Design - Horror Short Film",
      description:
        "Complete sound design and audio post-production for an independent horror short film. Created atmospheric soundscapes, designed custom foley effects, and mixed immersive audio that enhances psychological tension and jump scares.",
      techStack: [
        "FL Studio",
        "Field Recording",
        "Foley",
        "Audio Mixing",
        "Sound Effects",
      ],
      imageUrl: "/horror-short.png",
      liveUrl: "https://youtu.be/Bxs-rvhX2Bo?si=jQP4XveMZ6cnbGNp", // Video showcase with sound design breakdown
      githubUrl: "", // No GitHub for film work
    },
    {
      title: "3D Art & Modeling - Blender",
      description:
        "Creative 3D artwork and modeling projects using Blender. Specializing in realistic renders, stylized characters and environmental scenes. Features advanced lighting techniques, material design, and post-processing effects.",
      techStack: [
        "Blender",
        "Cycles Renderer",
        "Substance Painter",
        "3D Modeling",
        "Texturing",
      ],
      imageUrl: "/3d.png",
      liveUrl: "/3d-arts-viewer", // Internal 3D arts viewer
      githubUrl: "", // No GitHub for 3D art
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-4 text-yellow-500 font-mono text-sm tracking-wider">
              <div className="h-px bg-yellow-500 w-12"></div>
              <span>&gt; FEATURED_PROJECTS</span>
              <div className="h-px bg-yellow-500 w-12"></div>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            DIGITAL{" "}
            <span className="text-yellow-500 text-glow-gold">ARSENAL</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto font-mono"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            // Showcasing my history across web development, game creation, 3D
            art, music and sound design
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isTrailingOdd =
              projects.length % 2 !== 0 && index === projects.length - 1;

            const card = (
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                imageUrl={project.imageUrl}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                index={index}
              />
            );

            return isTrailingOdd ? (
              <div
                key={index}
                className="md:col-span-2 max-w-md mx-auto w-full"
              >
                {card}
              </div>
            ) : (
              <div key={index} className="h-full">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
