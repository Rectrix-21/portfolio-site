import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
