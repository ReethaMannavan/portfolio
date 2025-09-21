import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ProjectsPage from "../components/projects/ProjectPage";
import ProjectsPageNew from "../components/projects/ProjectPageNew";


const ProjectMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
  <ProjectsPageNew/>
      </main>
  <Footer/>
    </div>
  );
};

export default ProjectMainPage;
