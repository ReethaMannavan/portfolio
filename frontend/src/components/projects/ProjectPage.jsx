// src/pages/ProjectsPage.js
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Github } from "lucide-react";

const categories = [
  { key: "Django+React", label: "Django + React" },
  { key: "React", label: "React Only" },
  { key: "HTML/CSS", label: "HTML / CSS" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].key);

  useEffect(() => {
    api.get("/projects/")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Failed to fetch projects", err));
  }, []);

  const filteredProjects = projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-darkBg text-lightText py-12 px-4">
      <h1 className="text-4xl font-semibold text-center text-softGlow mb-12 animate-pulseGlow">
        My Projects
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === cat.key
                ? "bg-primaryTeal text-darkBg shadow-glow-primary"
                : "bg-gray-800 text-lightText hover:bg-darkTealBlue"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="bg-darkBg rounded-xl overflow-hidden shadow-glow-primary transition-all duration-500 hover:shadow-glow-hover hover:scale-105 cursor-pointer flex flex-col"
            onClick={() => proj.deployed_link && window.open(proj.deployed_link, "_blank")}
          >
            {/* Image */}
            <div className="w-full h-56 overflow-hidden rounded-t-xl">
              <img
                src={proj.image_url}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-teal-400 font-semibold text-lg">{proj.title}</h3>
              <p className="text-lightText text-sm mt-2 line-clamp-4">{proj.description}</p>
              {proj.github_link && (
                <a
                  href={proj.github_link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center mt-auto text-softGlow hover:text-primaryTeal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-5 h-5 mr-1" /> GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



