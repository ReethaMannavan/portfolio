import Footer from "../components/home/Footer";
import HeroCarousel from "../components/home/HeroCarousel";
import HeroSection from "../components/home/HeroSection";
import Navbar from "../components/home/Navbar";


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
       <HeroSection/>
       <HeroCarousel/>
      </main>
  <Footer/>
    </div>
  );
};

export default HomePage;
