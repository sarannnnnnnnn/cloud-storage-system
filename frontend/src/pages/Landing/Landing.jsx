import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/Landing/Hero";
import Features from "../../components/Landing/Features";
import Preview from "../../components/Landing/Preview";
import About from "../../components/Landing/About";
import Footer from "../../components/Landing/Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Preview />
      <About />
      <Footer />
    </>
  );
}

export default Landing;