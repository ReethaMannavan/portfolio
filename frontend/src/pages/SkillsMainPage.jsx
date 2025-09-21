import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import SkillsPage from "../components/skills/SkillsPage";


const SkillsMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
  <SkillsPage/>
      </main>
  <Footer/>
    </div>
  );
};

export default SkillsMainPage;
