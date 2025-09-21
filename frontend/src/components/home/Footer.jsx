// import { useEffect, useState } from "react";
// import api from "../../api/api";
// import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// export default function Footer() {
//   const [footer, setFooter] = useState(null);

//   useEffect(() => {
//     api
//       .get("/footer/")
//       .then((res) => {
//         if (res.data.length > 0) setFooter(res.data[0]);
//       })
//       .catch((err) => console.error("Footer fetch error:", err));
//   }, []);

//   if (!footer) return null;

//   return (
//     <footer className="bg-black text-lightText py-12 border-t border-cyan-500/30 relative">
//       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

//         {/* Contact Info */}
//         <div className="space-y-2 animate-fadeUp">
//           <h3 className="text-xl font-serif text-cyan-400 text-glow">Contact</h3>
//           {footer.phone && <p className="text-lightText">📞 {footer.phone}</p>}
//           {footer.email && <p className="text-lightText">✉️ {footer.email}</p>}
//         </div>

//         {/* Social Links */}
//         <div className="flex flex-col space-y-2 animate-fadeUp delay-200">
//           <h3 className="text-xl font-serif text-cyan-400 text-glow">Social</h3>
//           <div className="flex space-x-4 text-2xl mt-2">
//             {footer.github && (
//               <a
//                 href={footer.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
//               >
//                 <FaGithub />
//               </a>
//             )}
//             {footer.linkedin && (
//               <a
//                 href={footer.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
//               >
//                 <FaLinkedin />
//               </a>
//             )}
//             {footer.twitter && (
//               <a
//                 href={footer.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
//               >
//                 <FaTwitter />
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Optional Newsletter / Form */}
//         <div className="animate-fadeUp delay-400">
//           <h3 className="text-xl font-serif text-cyan-400 text-glow">Newsletter</h3>
//           <form className="mt-2 flex flex-col space-y-2">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="px-4 py-2 rounded-lg bg-darkBg border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//             />
//             <button
//               type="submit"
//               className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_30px_#00FFFF] hover:bg-cyan-400 transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="mt-12 text-center text-gray-400 text-sm animate-fadeUp delay-600">
//         &copy; {new Date().getFullYear()} {footer.name || "MyPortfolio"}. All rights reserved.
//       </div>
//     </footer>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../api/api";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [footer, setFooter] = useState(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/footer/")
      .then((res) => {
        if (res.data.length > 0) setFooter(res.data[0]);
      })
      .catch((err) => console.error("Footer fetch error:", err));
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email.trim()) return setMessage("Please enter your email.");
    setSubmitting(true);
    try {
      await api.post("/newsletter/subscribe/", { email });
      setMessage("Subscribed successfully! Check your email.");
      setEmail("");
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.email?.[0] || "An error occurred.");
      } else {
        setMessage("An error occurred. Try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!footer) return null;

  return (
    <footer className="bg-black text-lightText py-12 border-t border-cyan-500/30 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Contact Info */}
        <div className="space-y-2 animate-fadeUp">
          <h3 className="text-xl font-serif text-cyan-400 text-glow">Contact</h3>
          {footer.phone && <p className="text-cyan-300 font-medium">📞 {footer.phone}</p>}
          {footer.email && <p className="text-cyan-300 font-medium">✉️ {footer.email}</p>}
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-2 animate-fadeUp delay-200">
          <h3 className="text-xl font-serif text-cyan-400 text-glow">Social</h3>
          <div className="flex space-x-4 text-2xl mt-2">
            {footer.github && (
              <a
                href={footer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
              >
                <FaGithub />
              </a>
            )}
            {footer.linkedin && (
              <a
                href={footer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
              >
                <FaLinkedin />
              </a>
            )}
            {footer.twitter && (
              <a
                href={footer.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 drop-shadow-[0_0_6px_#00FFFF] transition"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="animate-fadeUp delay-400">
          <h3 className="text-xl font-serif text-cyan-400 text-glow">Newsletter</h3>
          <form
            className="mt-2 flex flex-col space-y-2"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg bg-darkBg border border-cyan-500 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_30px_#00FFFF] hover:bg-cyan-400 transition"
            >
              {submitting ? "Subscribing..." : "Subscribe"}
            </button>
            {message && (
              <p
                className={`text-sm mt-1 ${
                  message.includes("success") ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-gray-400 text-sm animate-fadeUp delay-600">
        &copy; {new Date().getFullYear()} {footer.name || "MyPortfolio"}. All rights reserved.
      </div>
    </footer>
  );
}
