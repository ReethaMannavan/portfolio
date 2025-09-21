// src/pages/ProjectsPage.js
import { useEffect, useState, useRef } from "react";
import api from "../../api/api";
import { Github } from "lucide-react";

const categories = [
  { key: "Django+React", label: "Django DRF / React Js" },
  { key: "React", label: "React JS" },
  { key: "HTML/CSS", label: "HTML / CSS" },
];

export default function ProjectsPageNew() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [rotation, setRotation] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    api.get("/projects/")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Failed to fetch projects", err));
  }, []);

  const filteredProjects = projects.filter(p => p.category === activeCategory);

  const cardCount = filteredProjects.length;
  const angle = 360 / (cardCount || 1);
  const radius = 300; // increased for more round/circular effect

  // Auto-rotate
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRotation(prev => prev + angle / 2);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [angle]);

  return (
    <div className="min-h-screen bg-darkBg text-lightText py-12 px-4 mt-6">
         <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 via-cyan-700 to-teal-900 animate-gradient-x opacity-40 z-0"></div>
     

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap z-10 relative mt-6">
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

      {/* Cylindrical 3D Carousel */}
      <div className="relative w-full flex justify-center mt-16">
        <div
          className="relative w-[80%] h-[380px] perspective"
          style={{ perspective: "1800px" }}
        >
          <div
            className="absolute w-full h-full transform-style-3d transition-transform duration-1000"
            style={{
              transform: `rotateY(${rotation}deg)`, // slight tilt
              transformStyle: "preserve-3d",
            }}
          >
            {filteredProjects.map((proj, i) => {
              const rotateY = i * angle;
              const isFront =
                (rotateY + rotation) % 360 < angle / 2 || (rotateY + rotation) % 360 > 360 - angle / 2;
              return (
                <div
                  key={proj.id}
                  className={`absolute top-1/2 left-1/2 bg-darkBg rounded-xl shadow-glow-primary cursor-pointer transition-all duration-500 flex flex-col overflow-hidden ${
                    isFront ? "scale-105 z-20" : "scale-95 z-10"
                  }`}
                  style={{
                    width: "240px",
                    height: "320px",
                    transform: `rotateY(${rotateY}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%)`,
                  }}
                  onClick={() => proj.deployed_link && window.open(proj.deployed_link, "_blank")}
                >
                  {/* Image */}
                  <div className="w-full h-44 overflow-hidden rounded-t-xl">
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}




