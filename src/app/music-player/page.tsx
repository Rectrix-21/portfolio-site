"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ExternalLink,
  Youtube,
  Music,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const MusicPlayer = () => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Audio visualizer state
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>(0);
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(
    new Uint8Array(128),
  );

  // Demo tracks
  const demoTracks = [
    {
      title: "Indie1",
      genre: "Indie Pop",
      duration: "3:09",
      file: "/music/demo1.mp3",
    },
    {
      title: "Indie2",
      genre: "Indie Pop",
      duration: "2:38",
      file: "/music/demo2.mp3",
    },
    {
      title: "RnB1",
      genre: "R&B",
      duration: "3:43",
      file: "/music/demo3.mp3",
    },
    {
      title: "Pop1",
      genre: "Electronic Pop",
      duration: "1:36",
      file: "/music/demo4.mp3",
    },
  ];

  const socialLinks = [
    {
      name: "YouTube Channel",
      url: "https://www.youtube.com/@RectrixMusic",
      icon: Youtube,
      description: "Latest releases and music videos",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/4rSrDvl5cc9jBfc1KjBDZv?si=C6W9PJytQ3yVM1rYI-jUQg",
      icon: Music,
      description: "Stream my released tracks",
    },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  // Initialize audio with first track
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && demoTracks[currentTrack]) {
      audio.src = demoTracks[currentTrack].file;
    }
  }, [currentTrack]);

  // Initialize audio on component mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && demoTracks[currentTrack]) {
      audio.src = demoTracks[currentTrack].file;
      audio.load();
    }
  }, []);

  // Initialize audio visualizer
  const initializeAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      try {
        audioContextRef.current = new (
          window.AudioContext || (window as any).webkitAudioContext
        )();
        analyserRef.current = audioContextRef.current.createAnalyser();

        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;

        if (!sourceRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(
            audioRef.current,
          );
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }

        updateFrequencyData();
      } catch (error) {
        
      }
    }
  };

  // Update frequency data for visualizer
  const updateFrequencyData = () => {
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      setFrequencyData(dataArray);
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateFrequencyData);
    }
  };

  // Start/stop visualizer animation
  useEffect(() => {
    if (isPlaying) {
      initializeAudioContext();
      updateFrequencyData();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (clampedVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleVolumeSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    handleVolumeChange(percent);
  };

  const handleVolumeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingVolume(true);

    const handleMouseMove = (e: MouseEvent) => {
      const sliderElement = document.querySelector(
        ".volume-slider",
      ) as HTMLElement;
      if (sliderElement) {
        const rect = sliderElement.getBoundingClientRect();
        const percent = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width),
        );
        handleVolumeChange(percent);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingVolume(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.src = demoTracks[index].file;
      audioRef.current.load();
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % demoTracks.length;
    playTrack(next);
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + demoTracks.length) % demoTracks.length;
    playTrack(prev);
  };

  // Simple CSS-Based Audio Visualizer
  const FloatingParticles = ({
    frequencyData,
    isPlaying,
  }: {
    frequencyData: Uint8Array;
    isPlaying: boolean;
  }) => {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Mesh[]>([]);
    const particleCount = 50;

    // Initialize particles once
    const initializeParticles = () => {
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 8;
        const y = Math.random() * 2 - 1;
        const z = (Math.random() - 0.5) * 8;

        particles.push({
          position: [x, y, z],
          baseScale: 0.05,
          index: i,
        });
      }
      return particles;
    };

    const [particles] = useState(() => initializeParticles());

    useFrame((state, delta) => {
      if (groupRef.current && particlesRef.current.length > 0) {
        particlesRef.current.forEach((mesh, i) => {
          if (mesh) {
            // Animate position
            mesh.position.y +=
              Math.sin(state.clock.elapsedTime * 2 + i) * 0.005;

            if (isPlaying) {
              // Update based on frequency data
              const freqIndex = Math.floor(
                (i / particleCount) * frequencyData.length,
              );
              const freq = frequencyData[freqIndex] || 0;
              const intensity = freq / 255;

              // Scale animation
              const scale = particles[i].baseScale + intensity * 0.1;
              mesh.scale.setScalar(scale);

              // Update material color and emissive
              const material = mesh.material as THREE.MeshStandardMaterial;
              const hue = 45 + intensity * 15;
              const saturation = 80 + intensity * 20;
              const lightness = 60 + intensity * 40;

              material.color.setHSL(
                hue / 360,
                saturation / 100,
                lightness / 100,
              );
              material.emissive.setHSL(45 / 360, 1, intensity * 0.3);
              material.opacity = 0.6 + intensity * 0.4;
            } else {
              // Reset to base state when paused
              mesh.scale.setScalar(particles[i].baseScale);
              const material = mesh.material as THREE.MeshStandardMaterial;
              material.color.setHSL(45 / 360, 0.8, 0.6);
              material.emissive.setHSL(45 / 360, 1, 0);
              material.opacity = 0.3;
            }
          }
        });
      }
    });

    return (
      <group ref={groupRef}>
        {particles.map((particle, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) particlesRef.current[i] = el;
            }}
            position={particle.position as [number, number, number]}
            scale={[particle.baseScale, particle.baseScale, particle.baseScale]}
          >
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color="#D4AF37" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    );
  };

  // Simple CSS-Based Audio Visualizer
  const AudioVisualizer = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none z-10 overflow-hidden">
        {/* Animated Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: isPlaying
              ? `radial-gradient(ellipse at center bottom, rgba(212, 175, 55, 0.3) 0%, rgba(255, 215, 0, 0.2) 30%, transparent 70%)`
              : `radial-gradient(ellipse at center bottom, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
            transition: "background 0.5s ease",
          }}
        />

        {/* Central Pulsing Orb */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          {(() => {
            const avgFreq = isPlaying
              ? Array.from(frequencyData).reduce((a, b) => a + b, 0) /
                frequencyData.length
              : 0;
            const intensity = avgFreq / 255;
            const size = 60 + intensity * 40;

            return (
              <div
                className="rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, 
                    rgba(255, 215, 0, ${0.8 + intensity * 0.2}) 0%, 
                    rgba(212, 175, 55, ${0.6 + intensity * 0.4}) 30%, 
                    rgba(255, 223, 0, ${0.3 + intensity * 0.7}) 60%, 
                    transparent 100%)`,
                  transform: isPlaying
                    ? `scale(${1 + intensity * 0.3}) rotate(${intensity * 360}deg)`
                    : "scale(1)",
                  transition: "all 0.1s ease-out",
                  filter: `blur(${1 + intensity * 3}px) brightness(${1 + intensity})`,
                  boxShadow: isPlaying
                    ? `0 0 ${30 + intensity * 50}px rgba(255, 215, 0, ${0.6 + intensity * 0.4})`
                    : "none",
                  animation: isPlaying
                    ? "pulse 0.5s ease-in-out infinite alternate"
                    : "none",
                }}
              />
            );
          })()}
        </div>

        {/* Frequency Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-8">
          {Array.from({ length: 32 }).map((_, i) => {
            const freq = isPlaying
              ? frequencyData[Math.floor(i * (frequencyData.length / 32))] || 0
              : 0;
            const height = Math.max(4, (freq / 255) * 120);

            return (
              <div
                key={i}
                className="flex-1 rounded-t-lg"
                style={{
                  height: `${height}px`,
                  background: `linear-gradient(to top, 
                    rgba(212, 175, 55, ${0.8 + (freq / 255) * 0.2}) 0%, 
                    rgba(255, 215, 0, ${0.6 + (freq / 255) * 0.4}) 50%, 
                    rgba(255, 223, 0, ${0.4 + (freq / 255) * 0.6}) 100%)`,
                  transition: "height 0.1s ease-out",
                  opacity: isPlaying ? 0.8 + (freq / 255) * 0.2 : 0.3,
                  filter: `brightness(${1 + (freq / 255) * 0.5})`,
                  boxShadow: isPlaying
                    ? `0 0 ${8 + (freq / 255) * 12}px rgba(255, 215, 0, ${0.3 + (freq / 255) * 0.7})`
                    : "none",
                }}
              />
            );
          })}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => {
            const freq = isPlaying ? frequencyData[i * 6] || 0 : 0;
            const intensity = freq / 255;
            const size = 4 + intensity * 8;
            const x = (i / 19) * 90 + 5; // Spread across screen
            const y = 20 + Math.sin(i * 0.5) * 30 + intensity * -20;

            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  bottom: `${y}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, 
                    rgba(255, 215, 0, ${0.6 + intensity * 0.4}) 0%, 
                    rgba(212, 175, 55, ${0.4 + intensity * 0.6}) 50%, 
                    transparent 100%)`,
                  transform: `scale(${0.5 + intensity}) rotate(${i * 18 + intensity * 180}deg)`,
                  transition: "all 0.15s ease-out",
                  filter: `blur(${0.5 + intensity}px)`,
                  opacity: isPlaying ? 0.7 + intensity * 0.3 : 0.2,
                  boxShadow: isPlaying
                    ? `0 0 ${10 + intensity * 20}px rgba(255, 215, 0, ${0.4 + intensity * 0.6})`
                    : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Audio Visualizer */}
      <AudioVisualizer />

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-red-600/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-yellow-500 font-mono border border-yellow-500/30 px-4 py-2 hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            <span>BACK_TO_PROJECTS</span>
          </motion.button>

          <div className="text-yellow-500 font-mono text-sm tracking-wider">
            &gt; MUSIC_SHOWCASE
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-white mb-12 font-mono tracking-wider text-center"
        >
          MUSIC{" "}
          <span className="text-yellow-500 text-glow-gold">PRODUCTIONS</span>
        </motion.h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Music Player Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="cyber-panel p-6"
          >
            <h2 className="text-2xl font-bold text-yellow-500 mb-6 font-mono tracking-wider">
              &gt; UNRELEASED_DEMOS
            </h2>

            {/* Audio Element */}
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false);
                nextTrack();
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={(e) => {
                console.error("Audio error:", e);
                setIsPlaying(false);
              }}
              onLoadStart={() => {
                setCurrentTime(0);
                setDuration(0);
                setIsLoading(true);
              }}
              onCanPlay={() => {
                setIsLoading(false);
              }}
              onLoadedMetadata={() => {
                handleLoadedMetadata();
                setIsLoading(false);
              }}
              preload="metadata"
            >
              <source src={demoTracks[currentTrack]?.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            {/* Current Track Info */}
            <div className="bg-black/50 p-4 rounded border border-yellow-500/30 mb-4">
              <h3 className="text-yellow-500 font-mono text-lg mb-1">
                {demoTracks[currentTrack].title}
              </h3>
              <p className="text-gray-400 font-mono text-sm">
                Genre: {demoTracks[currentTrack].genre}
              </p>
            </div>

            {/* Player Controls */}
            <div className="bg-black/70 p-4 rounded border border-yellow-500/20">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <motion.button
                  onClick={prevTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <SkipBack size={24} />
                </motion.button>

                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors bg-yellow-500/20 p-3 rounded-full"
                >
                  {isLoading ? (
                    <div className="animate-spin w-7 h-7 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                  ) : isPlaying ? (
                    <Pause size={28} />
                  ) : (
                    <Play size={28} />
                  )}
                </motion.button>

                <motion.button
                  onClick={nextTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <SkipForward size={24} />
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div
                  className="h-2 bg-gray-800 rounded-full cursor-pointer relative"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{
                      width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={toggleMute}
                  whileHover={{ scale: 1.1 }}
                  className="text-yellow-500"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </motion.button>
                <div
                  className="flex-1 h-2 bg-gray-800 rounded-full cursor-pointer volume-slider"
                  onClick={handleVolumeSliderClick}
                  onMouseDown={handleVolumeMouseDown}
                >
                  <div
                    className="h-full bg-yellow-500 rounded-full relative"
                    style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                  >
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border border-yellow-400 cursor-grab active:cursor-grabbing" />
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-mono w-8">
                  {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
                </span>
              </div>
            </div>

            {/* Track List */}
            <div className="mt-6">
              <h4 className="text-yellow-500 font-mono text-sm mb-3 tracking-wider">
                &gt; DEMO_TRACKS:
              </h4>
              <div className="space-y-2">
                {demoTracks.map((track, index) => (
                  <motion.div
                    key={index}
                    onClick={() => playTrack(index)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded border cursor-pointer transition-all duration-300 ${
                      index === currentTrack
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-gray-700 hover:border-yellow-500/50 hover:bg-yellow-500/5"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-mono text-sm">
                          {track.title}
                        </p>
                        <p className="text-gray-400 font-mono text-xs">
                          {track.genre}
                        </p>
                      </div>
                      <span className="text-gray-400 font-mono text-xs">
                        {track.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Streaming Platforms */}
            <div className="cyber-panel p-6">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6 font-mono tracking-wider">
                &gt; STREAMING_PLATFORMS
              </h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-4 p-4 bg-black/50 rounded border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 group"
                  >
                    <div className="text-yellow-500">
                      <link.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-yellow-500 font-mono font-bold">
                        {link.name}
                      </p>
                      <p className="text-gray-400 font-mono text-sm">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink
                      size={18}
                      className="text-yellow-500 group-hover:text-yellow-400"
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Music Genres */}
            <div className="cyber-panel p-6">
              <h3 className="text-xl font-bold text-yellow-500 mb-4 font-mono tracking-wider">
                &gt; GENRES_&_STYLE
              </h3>
              <div className="space-y-3">
                {["Indie Pop", "R&B", "Electronic"].map((genre, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-red-600 font-mono">•</span>
                    <span className="text-gray-300 font-mono">{genre}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-black/30 rounded border border-red-600/30">
                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                  Crafting atmospheric soundscapes that blend electronic
                  textures with organic instrumentation. Each track explores the
                  intersection of digital production and human emotion.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
