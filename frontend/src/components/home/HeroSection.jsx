import { useEffect, useState } from "react";
import api from "../../api/api";

export default function HeroSection() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    api
      .get("/hero/")
      .then((res) => setHero(res.data[0])) // latest active
      .catch((err) => console.error("Hero fetch error:", err));
  }, []);

  if (!hero) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black text-white">

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 via-cyan-700 to-teal-900 animate-gradient-x opacity-40 z-0"></div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

        {/* Left Content */}
        <div className="space-y-6 animate-fade-up">

         <h1 className="flex flex-wrap text-3xl md:text-4xl px-4 font-serif text-primaryTeal">
  {hero.title.split("").map((char, i) => (
    <span
      key={i}
      className="inline-block text-glow"
      style={{
        opacity: 0, // start invisible
        animation: `fadeUp 0.5s ease-out forwards, waveMotion 1.5s ease-in-out infinite`,
        animationDelay: `${i * 0.1}s, ${i * 0.1 + 0.5}s`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
</h1>

          
          <p className="text-lg md:text-xl text-gray-300 font-sans drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-fade-up delay-200">
            {hero.subtitle}
          </p>
          {hero.button_text && hero.button_link && (
            <a
              href={hero.button_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-cyan-500 text-black font-semibold rounded-lg shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_30px_#00FFFF] hover:bg-cyan-400 transition-all duration-300 animate-fade-up delay-400"
            >
              {hero.button_text}
            </a>
          )}
        </div>

        {/* Right Image */}
        {hero.image && (
          <div className="flex justify-center animate-float">
            <img
              src={hero.image}
              alt="Hero"
             className="rounded-full border-2 border-cyan-400 shadow-[0_0_30px_#00FFFF] 
               w-72 h-72 md:w-96 md:h-96 object-cover"
            />
          </div>

          
        )}
      </div>
    </section>
  );
}
