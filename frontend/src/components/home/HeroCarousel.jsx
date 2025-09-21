// import { useEffect, useState } from "react";
// import api from "../../api/api";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// export default function HeroCarousel() {
//   const [slides, setSlides] = useState([]);

//   useEffect(() => {
//     api
//       .get("/hero-slides/")
//       .then((res) => setSlides(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   if (slides.length === 0) return null;

//   return (
//     <div className="relative w-full bg-black py-12">
//       {/* Featured Projects Title */}
//       <h2 className="text-3xl md:text-4xl font-serif text-cyan-400 text-center mb-8 drop-shadow-[0_0_20px_#00FFFF] animate-pulseGlow">
//         Featured Projects
//       </h2>

//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         loop
//         className="w-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4 md:px-16">
//               {/* Left: Image */}
//               <div className="relative w-full h-64 md:h-[60vh]">
//                 <img
//                   src={slide.image}
//                   alt={slide.title}
//                   className="w-full h-full object-cover object-center brightness-60 rounded-lg shadow-glow-primary"
//                 />
//                 {/* Optional overlay for extra contrast */}
//                 <div className="absolute inset-0 bg-black/30 rounded-lg z-10"></div>
//               </div>

//               {/* Right: Text */}
//               <div className="text-center md:text-left flex flex-col justify-center space-y-4 px-2 md:px-0">
//                 <h3 className="text-4xl md:text-5xl font-serif text-cyan-400 drop-shadow-[0_0_20px_#00FFFF] animate-pulseGlow">
//                   {slide.title}
//                 </h3>
//                 {slide.subtitle && (
//                   <p className="text-lg md:text-2xl text-gray-200 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-fadeUp">
//                     {slide.subtitle}
//                   </p>
//                 )}
//                 {slide.button_text && slide.button_link && (
//                   <a
//                     href={slide.button_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block mt-4 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_30px_#00FFFF] hover:bg-cyan-400 transition-all duration-300 animate-fadeUp delay-200"
//                   >
//                     {slide.button_text}
//                   </a>
//                 )}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    api
      .get("/hero-slides/")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full bg-black py-12">
      {/* Featured Projects Title */}
      <h2 className="text-3xl md:text-4xl font-serif text-cyan-400 text-center mb-8 drop-shadow-[0_0_20px_#00FFFF] animate-pulseGlow">
        Featured Projects
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4 md:px-16">
              {/* Left: Image */}
              <div className="relative w-full h-64 md:h-[60vh]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center brightness-60 rounded-lg shadow-glow-primary"
                />
                {/* Overlay for extra contrast */}
                <div className="absolute inset-0 bg-black/30 rounded-lg z-10"></div>
              </div>

              {/* Right: Text */}
              <div className="text-center md:text-left flex flex-col justify-center space-y-4 px-2 md:px-0">
                <h3 className="text-4xl md:text-5xl font-serif text-cyan-400 drop-shadow-[0_0_20px_#00FFFF] animate-pulseGlow">
                  {slide.title}
                </h3>
                {slide.subtitle && (
                  <p className="text-lg md:text-2xl text-gray-200 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-fadeUp">
                    {slide.subtitle}
                  </p>
                )}
                {slide.button_text && slide.button_link && (
                  <a
                    href={slide.button_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_30px_#00FFFF] hover:bg-cyan-400 transition-all duration-300 animate-fadeUp delay-200"
                  >
                    {slide.button_text}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

