"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, Phone, Instagram } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "EMAIL_ADDRESS",
      value: "abhijithkrishnan14@gmail.com",
      href: "mailto:abhijithkrishnan14@gmail.com",
      color: "text-[#D4AF37]",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "SOURCE_CODE",
      value: "github.com/Rectrix-21/portfolio-site",
      href: "https://github.com/Rectrix-21/portfolio-site",
      color: "text-[#B11226]",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "NETWORK_NODE",
      value: "linkedin.com/in/rectrix",
      href: "https://linkedin.com/in/rectrix",
      color: "text-[#D4AF37]",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "COORDINATES",
      locations: [
        { label: "HOME", value: "Kerala, India" },
        { label: "CURRENT", value: "Calgary, Canada" }
      ],
      href: null,
      color: "text-[#B11226]",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "PHONE_NUMBER",
      value: "+1 (368) 299-7147",
      href: "tel:+13682997147",
      color: "text-[#D4AF37]",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      {/* Animated circuit lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-[#D4AF37] via-transparent to-[#B11226]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-l from-[#B11226] via-transparent to-[#D4AF37]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
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
            <span className="cyber-text-shadow">ESTABLISH</span>
            <br />
            <span className="text-[#D4AF37] cyber-glow">CONNECTION</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-[#B11226]"
            >
              █
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto font-mono tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[#D4AF37]">&gt;</span> READY TO INITIALIZE NEW
            PROJECT? LET'S CREATE DIGITAL MAGIC
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cyber-panel group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#B11226]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <h3 className="text-2xl font-bold text-white mb-6 font-mono tracking-wider cyber-text-shadow relative z-10">
              <span className="text-[#D4AF37]">&gt;</span> SEND_MESSAGE.exe
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#D4AF37] mb-2 font-mono tracking-wider"
                  >
                    USERNAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="cyber-input"
                    placeholder="Enter your designation..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#D4AF37] mb-2 font-mono tracking-wider"
                  >
                    COMM_CHANNEL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="cyber-input"
                    placeholder="your.email@domain.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[#D4AF37] mb-2 font-mono tracking-wider"
                >
                  SUBJECT_ID
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="cyber-input"
                  placeholder="Mission briefing..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#D4AF37] mb-2 font-mono tracking-wider"
                >
                  DATA_DESCRIPTION
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="cyber-input resize-none"
                  placeholder="Transmit your project specifications..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{
                  scale: isSubmitting ? 1 : 1.02,
                  boxShadow: isSubmitting ? "none" : "0 0 30px rgba(212, 175, 55, 0.5)",
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className={`cyber-button w-full group relative overflow-hidden ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-black font-bold tracking-wider">
                  <Send size={20} />
                  {isSubmitting ? "TRANSMITTING..." : "TRANSMIT_DATA"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] group-hover:from-[#FFD700] group-hover:to-[#D4AF37] transition-all duration-300"></div>
              </motion.button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cyber-panel bg-green-900/20 border-green-500/50 mt-4"
                >
                  <p className="text-green-400 font-mono text-center">
                    <span className="text-[#D4AF37]">&gt;</span> MESSAGE_TRANSMITTED_SUCCESSFULLY ✓
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cyber-panel bg-red-900/20 border-red-500/50 mt-4"
                >
                  <p className="text-red-400 font-mono text-center">
                    <span className="text-[#B11226]">&gt;</span> TRANSMISSION_FAILED. RETRY_PROTOCOL ✗
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="cyber-panel">
              <h3 className="text-2xl font-bold text-white mb-6 font-mono tracking-wider cyber-text-shadow">
                <span className="text-[#D4AF37]">&gt;</span> SYSTEM_INFO.log
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-mono">
                I'm always online and ready to interface with new collaborators.
                Whether you have a mission briefing or want to establish a
                connection,
                <span className="text-[#B11226]"> PING_ME.exe </span>
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="cyber-panel group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#B11226]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-center space-x-4 relative z-10">
                    <div
                      className={`flex-shrink-0 w-12 h-12 cyber-panel flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform`}
                    >
                      {info.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="text-xs text-gray-400 font-mono tracking-widest">
                        {info.label}
                      </div>
                      {info.locations ? (
                        <div className="space-y-1">
                          {info.locations.map((loc: any, locIndex: number) => (
                            <div key={locIndex} className="flex items-center gap-2">
                              <span className="text-[#D4AF37] text-xs font-mono">{loc.label}:</span>
                              <span className="text-white font-mono">{loc.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-[#D4AF37] transition-colors font-mono cyber-glow"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-white font-mono">{info.value}</div>
                      )}
                    </div>
                  </div>

                  {/* Corner brackets */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-[#B11226] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="pt-8"
            >
              <div className="cyber-panel">
                <h4 className="text-lg font-semibold text-white mb-4 font-mono tracking-wider">
                  <span className="text-[#D4AF37]">&gt;</span>{" "}
                  SOCIAL_NETWORKS.dll
                </h4>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/Rectrix-21"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 0 20px rgba(177, 18, 38, 0.5)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="cyber-button-small bg-gradient-to-r from-[#B11226] to-[#DC143C] text-white"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/rectrix"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      rotate: -5,
                      boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="cyber-button-small bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/abhijith_21"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 0 20px rgba(177, 18, 38, 0.5)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="cyber-button-small bg-gradient-to-r from-[#B11226] to-[#D4AF37] text-white"
                  >
                    <Instagram size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
