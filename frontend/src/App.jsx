import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import ProjectMainPage from "./pages/ProjectMainPage";
import SkillsMainPage from "./pages/SkillsMainPage";


function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen font-roboto">
          <main>
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/skills" element={<SkillsMainPage />} />
              <Route path="/contact" element={<ContactPage/>} />
              <Route path="/projects" element={<ProjectMainPage/>} />
              
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
