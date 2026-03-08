"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, X } from "lucide-react";
import { useState } from "react";

const ThreeDArtsViewer = () => {
  const router = useRouter();
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  const artworks = [
    {
      id: 1,
      title: "Astronaut Scene",
      type: "image",
      url: "3d-arts/astro.png",
      description:
        "A detailed 3D render of an astronaut in a cosmic environment",
    },
    {
      id: 2,
      title: "Unfelt Love",
      type: "image",
      url: "3d-arts/astro2.png",
      description:
        "A stylized character sitting on top of a classic Mustang car holding a glass bottled rose, showcasing modeling and texturing skills",
    },
    {
      id: 3,
      title: "Oblivion",
      type: "image",
      url: "3d-arts/oblivion.png",
      description:
        "A stylized character floating on top of ocean waves with hand models around, showcasing modeling and texturing skills",
    },
    {
      id: 4,
      title: "Halloween Scene",
      type: "image",
      url: "3d-arts/halloween.png",
      description:
        "A halloween-themed 3D scene with the stylized character and 3 ghostly figures and floral elements, showcasing modeling and texturing skills",
    },
    {
      id: 5,
      title: "Stargazing",
      type: "video",
      url: "https://github.com/Rectrix-21/portfolio-site/releases/download/v1.0-videos/stargazing.mov",
      thumbnail: "3d-arts/stargazing-thumb.png",
      description:
        "A video showcasing a character stargazing in a serene environment",
    },
    {
      id: 6,
      title: "Halloween Animation",
      type: "video",
      url: "https://github.com/Rectrix-21/portfolio-site/releases/download/v1.0-videos/Halloween.mov",
      thumbnail: "3d-arts/halloween.png",
      description:
        "The animation sequence of the Halloween scene, showcasing character movement and environmental effects",
    },
    {
      id: 7,
      title: "Oblivion Animation",
      type: "video",
      url: "https://github.com/Rectrix-21/portfolio-site/releases/download/v1.0-videos/Oblivion.mp4",
      thumbnail: "3d-arts/oblivion.png",
      description:
        "The animation sequence of the Oblivion scene, showcasing character movement and environmental effects",
    },
    {
      id: 8,
      title: "LYB intro reel Animation",
      type: "video",
      url: "https://github.com/Rectrix-21/portfolio-site/releases/download/v1.0-videos/Timeline.1.mov",
      thumbnail: "3d-arts/lyb-thumb.png",
      description:
        "A cinematic intro reel for the song 'Love You Better', showcasing various 3D assets and animations created for the project",
    },
  ];

  const openModal = (artwork: any) => {
    setSelectedMedia(artwork);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  // Filter artworks based on active tab
  const filteredArtworks = artworks.filter((artwork) =>
    activeTab === "images"
      ? artwork.type === "image"
      : artwork.type === "video",
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b-2 border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors font-mono mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold tracking-wider">BACK_TO_PROJECTS</span>
          </motion.button>
          <h1 className="text-4xl font-bold text-yellow-500 mb-2 font-mono tracking-wider">
            3D_ARTS_GALLERY
          </h1>
          <p className="text-red-600 font-mono tracking-wider">
            BLENDER • MODELING • VISUALIZATION
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-4">
            <motion.button
              onClick={() => setActiveTab("images")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 font-mono font-bold tracking-wider transition-all duration-300 relative ${
                activeTab === "images"
                  ? "text-yellow-500 border-b-4 border-yellow-500"
                  : "text-gray-500 hover:text-yellow-400"
              }`}
            >
              IMAGES
              {activeTab === "images" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 w-2 h-2 bg-red-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("videos")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 font-mono font-bold tracking-wider transition-all duration-300 relative ${
                activeTab === "videos"
                  ? "text-yellow-500 border-b-4 border-yellow-500"
                  : "text-gray-500 hover:text-yellow-400"
              }`}
            >
              VIDEOS
              {activeTab === "videos" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 w-2 h-2 bg-red-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative cyberpunk-panel overflow-hidden cursor-pointer border-2 border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
              onClick={() => openModal(artwork)}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500 opacity-60"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600 opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600 opacity-60"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500 opacity-60"></div>

              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                {artwork.type === "video" ? (
                  <img
                    src={artwork.thumbnail}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/pfp.png";
                    }}
                  />
                ) : (
                  <img
                    src={artwork.url}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/pfp.png";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {artwork.type === "video" ? (
                    <Play className="w-16 h-16 text-yellow-500" />
                  ) : (
                    <div className="text-yellow-500 font-mono text-lg font-bold">
                      VIEW
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 bg-black/80 border-t-2 border-yellow-500/20">
                <h3 className="text-xl font-bold text-yellow-500 mb-2 font-mono tracking-wider">
                  {artwork.title.toUpperCase()}
                </h3>
                <p className="text-gray-400 text-sm">{artwork.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for detailed view */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-black border-4 border-yellow-500/30 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-500 z-10"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-red-600 z-10"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-red-600 z-10"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-500 z-10"></div>

            {/* Close button */}
            <motion.button
              onClick={closeModal}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-20 text-yellow-500 hover:text-red-600 transition-colors"
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-yellow-500 mb-6 font-mono tracking-wider">
                {selectedMedia.title.toUpperCase()}
              </h2>

              <div className="mb-6 border-2 border-yellow-500/20">
                {selectedMedia.type === "video" ? (
                  <video controls autoPlay className="w-full bg-black">
                    <source src={selectedMedia.url} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="w-full h-auto object-contain bg-black min-h-[400px]"
                    onError={(e) => {
                      e.currentTarget.src = "/pfp.png";
                    }}
                  />
                )}
              </div>

              <p className="text-gray-300 text-lg mb-4">
                {selectedMedia.description}
              </p>
              <div className="inline-block px-4 py-2 border-2 border-yellow-500/30 text-yellow-500 font-mono">
                {selectedMedia.type.toUpperCase()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ThreeDArtsViewer;
