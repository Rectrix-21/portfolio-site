"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const animationRef = useRef<number>(0);

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = 100;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? "#D4AF37" : "#B11226",
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      setParticles(newParticles);
    };

    initParticles();

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mousePos.x, 2) +
            Math.pow(particle.y - mousePos.y, 2),
        );
        const mouseInfluence = Math.max(0, 150 - mouseDistance) / 150;

        // Scroll influence
        const scrollInfluence = Math.sin(scrollY * 0.01 + index * 0.1) * 0.5;

        // Update position
        particle.x += particle.vx + mouseInfluence * 2 + scrollInfluence;
        particle.y += particle.vy + mouseInfluence * 2;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity + mouseInfluence * 0.3;
        ctx.fill();

        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (otherIndex <= index) return;

          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2),
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 100) * 0.3;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mousePos, scrollY]);

  return (
    <>
      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: "transparent" }}
      />

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-yellow-500/20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Scanning lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"
          animate={{
            y: ["-10px", "100vh", "-10px"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent"
          animate={{
            y: ["100vh", "-10px", "100vh"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
      </div>

      {/* Circuit-like lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-yellow-500/20 via-transparent to-red-600/20"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleX: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 bottom-1/4 w-full h-px bg-gradient-to-l from-red-600/20 via-transparent to-yellow-500/20"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleX: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>
    </>
  );
};

export default AnimatedBackground;
