"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Play, Volume2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  techStack,
  imageUrl,
  liveUrl,
  githubUrl,
  index,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleLiveUrlClick = () => {
    if (
      liveUrl &&
      (liveUrl.startsWith("/video/") ||
        liveUrl.startsWith("/music-player") ||
        liveUrl.startsWith("/3d-arts-viewer"))
    ) {
      router.push(liveUrl);
    } else if (liveUrl) {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative cyberpunk-panel rounded-none overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20"
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/0 to-red-600/0 group-hover:from-yellow-500/30 group-hover:via-yellow-500/10 group-hover:to-red-600/30 transition-all duration-500 pointer-events-none"></div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500 opacity-60"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500 opacity-60"></div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-black border-b border-yellow-500/20">
        {/* Project Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-red-600/10"></div>

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent h-1"
          animate={{ y: [0, 192, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <motion.div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {liveUrl && (
            <motion.button
              onClick={handleLiveUrlClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors border border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
            >
              {liveUrl.startsWith("/video/") ? (
                <Play size={20} />
              ) : liveUrl.startsWith("/music-player") ? (
                <Volume2 size={20} />
              ) : (
                <ExternalLink size={20} />
              )}
            </motion.button>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Github size={20} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Data stream effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

        <motion.h3
          className="text-xl font-bold text-yellow-500 mb-3 font-mono tracking-wide uppercase group-hover:text-glow-gold transition-all duration-300"
          layoutId={`title-${index}`}
        >
          {title}
        </motion.h3>

        <p className="text-gray-300 text-sm mb-4 leading-relaxed font-mono">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              className="px-2 py-1 bg-black/50 text-yellow-500 text-xs font-mono tracking-wider border border-yellow-500/30 hover:border-yellow-500 hover:shadow-sm hover:shadow-yellow-500/20 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {liveUrl && (
            <motion.button
              onClick={handleLiveUrlClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm font-mono font-bold tracking-wide uppercase hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30"
            >
              {liveUrl.startsWith("/video/") ? (
                <Play size={16} />
              ) : liveUrl.startsWith("/music-player") ? (
                <Volume2 size={16} />
              ) : (
                <ExternalLink size={16} />
              )}
              {liveUrl.startsWith("/video/")
                ? "WATCH_DEMO"
                : liveUrl.startsWith("/music-player")
                  ? "LISTEN_NOW"
                  : liveUrl.includes("youtu")
                    ? "WATCH_NOW"
                    : "LIVE_DEMO"}
            </motion.button>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-600 text-red-600 text-sm font-mono font-bold tracking-wide uppercase hover:bg-red-600/10 hover:border-red-500 transition-all duration-300"
            >
              <Github size={16} />
              GITHUB
            </motion.a>
          )}
        </div>

        {/* Terminal prompt line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-red-600/50 via-transparent to-yellow-500/50"></div>
      </div>

      {/* Matrix-style data overlay */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={
          isHovered
            ? {
                backgroundPosition: ["0% 0%", "0% 100%"],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-yellow-500/20 text-xs font-mono absolute top-2 right-2 leading-3">
          01001001
          <br />
          11010110
          <br />
          00110101
          <br />
          10101001
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
