"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-lg border-b border-yellow-500/20 shadow-lg shadow-yellow-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-yellow-500 cursor-pointer font-mono tracking-wider relative"
            onClick={() => scrollToSection("hero")}
          >
            <span className="text-glow-gold">AK</span>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-red-600 opacity-60"></div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 10px #D4AF37",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-yellow-500 transition-all duration-300 font-mono tracking-wide text-sm uppercase border-b border-transparent hover:border-yellow-500/50 pb-1 relative group"
              >
                {item.name}
                <span className="absolute inset-0 border border-transparent group-hover:border-yellow-500/20 group-hover:shadow-lg group-hover:shadow-yellow-500/20 transition-all duration-300 -z-10"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-yellow-500 transition-colors p-2 border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-yellow-500/20 bg-black/95 backdrop-blur-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-md transition-all font-mono tracking-wide text-sm uppercase border border-transparent hover:border-yellow-500/20"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
