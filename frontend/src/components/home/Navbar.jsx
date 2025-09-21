import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function Navbar() {
  const [navData, setNavData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch Navbar config from backend
  useEffect(() => {
    api
      .get("/navbar/")
      .then((res) => setNavData(res.data[0])) // get first config
      .catch((err) => console.error("Navbar fetch error:", err));
  }, []);

  // Menu items
  const menuItems = [
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-sm text-white fixed w-full z-50 shadow-[0_0_15px_rgba(0,255,255,0.4)] border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo + Text */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            {navData?.logo && (
              <img
                src={navData.logo}
                alt="Logo"
                className="h-10 w-10 object-contain drop-shadow-[0_0_8px_#00FFFF]"
              />
            )}
            <span className="text-2xl font-serif text-cyan-400 drop-shadow-[0_0_10px_#00FFFF] font-bold">
              {navData?.text || "MyPortfolio"}
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-sans text-xl text-cyan-400 font-bold">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-cyan-400 text-3xl drop-shadow-[0_0_6px_#00FFFF]"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-black/95 px-6 pb-6 space-y-4 shadow-[0_0_20px_rgba(0,255,255,0.3)] border-t border-cyan-500/30">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
