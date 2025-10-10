import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import Impact from "@/components/our-impact";
import Tagline from "@/components/tagline";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Impact />
      <About />
      <Tagline />
      <Services />
      <Approach />
      <Footer />
    </div>
  );
};

export default Index;
