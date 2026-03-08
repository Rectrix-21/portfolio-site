"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const VideoPlayer = () => {
  const params = useParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const projectData: { [key: string]: any } = {
    "silent-hill-game": {
      title: "The Sin Beneath - Development Progress",
      videoUrl: "https://github.com/Rectrix-21/portfolio-site/releases/download/v1.0-videos/horror-game-progress1.mp4",
      description:
        "Current development progress showcasing MetaHuman character integration, interactive environment systems, and atmospheric horror elements in Unreal Engine 5.",
      features: [
        "MetaHuman character with custom first-person clothing",
        "Basic bedroom environment design",
        "Intro and waking-up animation sequences",
        "Functional clock system",
        "Interactive light switches",
        "Object inspection system",
        "Door interaction logic",
        "Initial sound design",
        "Inventory system (in development)",
      ],
    },
  };

  const project = projectData[params.project as string];

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 font-mono text-xl">PROJECT_NOT_FOUND</div>
      </div>
    );
  }

  // Initialize video on component mount
  useEffect(() => {
    const video = videoRef.current;
    if (video && !isInitialized) {
      // Reset states on mount
      setIsLoading(false);
      setVideoError(false);
      setIsPlaying(false);

      // Set initial muted state and volume
      video.muted = isMuted;
      video.volume = volume;

      // Force metadata load
      video.load();
      setIsInitialized(true);
    } else if (video && isInitialized) {
      // Only update muted state without reloading
      video.muted = isMuted;
    }
  }, [isMuted, isInitialized, volume]);

  // Separate useEffect for volume changes (without reloading video)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume;
    }
  }, [volume]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
          setIsLoading(false);
          setVideoError(false);
        }
      } catch (error) {
        console.error("Error playing video:", error);
        setIsPlaying(false);
        setVideoError(true);
        setIsLoading(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      videoRef.current.volume = clampedVolume;
      setVolume(clampedVolume);

      // Only auto-unmute if user explicitly increases volume and video is initialized
      if (clampedVolume > 0 && isMuted && isInitialized) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      // Don't auto-mute when volume is 0 to avoid triggering useEffect
    }
  };

  const handleVolumeSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    handleVolumeChange(percent);
  };

  const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingVolume(true);
    handleVolumeSliderClick(e);
  };

  const handleVolumeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingVolume) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      handleVolumeChange(percent);
    }
  };

  const handleVolumeMouseUp = () => {
    setIsDraggingVolume(false);
  };

  // Global mouse up listener for volume dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDraggingVolume(false);
    };

    if (isDraggingVolume) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("mouseleave", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mouseleave", handleGlobalMouseUp);
    };
  }, [isDraggingVolume]);

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (videoContainer?.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      setVideoError(false);
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setVideoError(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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
            &gt; VIDEO_SHOWCASE
          </div>
        </motion.div>

        {/* Video Player Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider text-center"
          >
            {project.title.split(" - ")[0]}{" "}
            <span className="text-yellow-500 text-glow-gold">
              {project.title.split(" - ")[1]}
            </span>
          </motion.h1>

          {/* Video Player */}
          <div
            className={`relative bg-black border-2 border-yellow-500/30 rounded-lg overflow-hidden mb-8 cyber-panel ${
              isFullscreen
                ? "fixed inset-0 z-50 rounded-none border-none mb-0"
                : ""
            }`}
          >
            <video
              ref={videoRef}
              className={`w-full bg-black relative z-0 ${
                isFullscreen ? "h-full object-contain" : "aspect-video"
              }`}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => {
                setIsPlaying(true);
                setIsLoading(false);
                setVideoError(false);
              }}
              onError={handleVideoError}
              onLoadStart={handleLoadStart}
              onCanPlay={handleCanPlay}
              poster="/horror-game.png"
              preload="metadata"
              controls={false}
              style={{ pointerEvents: "none" }} // Prevent video from intercepting clicks
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Loading/Error Overlay */}
            {(isLoading || videoError) && !isPlaying && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-5">
                <div className="text-center text-yellow-500 font-mono">
                  {videoError ? (
                    <>
                      <div className="text-4xl mb-4">❌</div>
                      <div>VIDEO_ERROR</div>
                      <div className="text-sm text-gray-400 mt-2">
                        Could not load: {project.videoUrl}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl mb-4 animate-pulse">⏳</div>
                      <div>LOADING_VIDEO...</div>
                      <div className="text-sm text-gray-400 mt-2">
                        {project.videoUrl}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Video Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent z-10 transition-all duration-300 ${
                isFullscreen ? "p-6" : "p-4"
              }`}
            >
              <div
                className={`flex items-center ${isFullscreen ? "space-x-6" : "space-x-4"}`}
              >
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors z-20"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>

                <motion.button
                  onClick={toggleMute}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors z-20"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </motion.button>

                {/* Volume Slider */}
                <div className="flex items-center space-x-2 z-20">
                  <div
                    className={`w-20 h-2 bg-gray-800 rounded-full cursor-pointer relative hover:h-3 transition-all duration-200 ${
                      isDraggingVolume ? "h-3" : ""
                    }`}
                    onMouseDown={handleVolumeMouseDown}
                    onMouseMove={handleVolumeMouseMove}
                    onMouseUp={handleVolumeMouseUp}
                    onClick={handleVolumeSliderClick}
                  >
                    <motion.div
                      className="h-full bg-yellow-500 rounded-full relative"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <motion.div
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border border-white shadow-lg transition-all duration-200 ${
                          isDraggingVolume
                            ? "scale-125 shadow-yellow-500/50"
                            : "hover:scale-110"
                        }`}
                        animate={{
                          scale: isDraggingVolume ? 1.25 : 1,
                          boxShadow: isDraggingVolume
                            ? "0 0 10px rgba(212, 175, 55, 0.5)"
                            : "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                    </motion.div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono w-8">
                    {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
                  </span>
                </div>

                <div className="flex-1 mx-4 z-20">
                  <div
                    className="h-3 bg-gray-800 rounded-full cursor-pointer relative hover:h-4 transition-all duration-200"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-yellow-500 rounded-full relative transition-all duration-100"
                      style={{
                        width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                      }}
                    >
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <motion.button
                  onClick={toggleFullscreen}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors z-20"
                >
                  <Maximize2 size={isFullscreen ? 28 : 24} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="cyber-panel p-6"
            >
              <h3 className="text-xl font-bold text-yellow-500 mb-4 font-mono tracking-wider">
                &gt; PROJECT_OVERVIEW
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="cyber-panel p-6"
            >
              <h3 className="text-xl font-bold text-yellow-500 mb-4 font-mono tracking-wider">
                &gt; CURRENT_FEATURES
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="text-gray-300 font-mono text-sm flex items-start"
                  >
                    <span className="text-red-600 mr-2 mt-1">•</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoPlayer;
