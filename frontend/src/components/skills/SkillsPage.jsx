import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion } from "framer-motion";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get("/skills/").then(res => setSkills(res.data)).catch(err => console.error(err));
    api.get("/stats/").then(res => setStats(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-lightText py-16 px-6 mt-4">
      {/* Skills Section */}
      <h2 className="text-4xl font-semibold text-center text-softGlow mb-12 animate-pulseGlow">
        My Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="bg-darkTealBlue rounded-xl p-6 flex flex-col items-center shadow-glow-primary hover:shadow-glow-hover hover:scale-105 transition-transform cursor-pointer"
          >
            {skill.icon_class && (
              <i className={`${skill.icon_class} text-4xl text-primaryTeal mb-4`}></i>
            )}
            <h3 className="text-teal-400 font-semibold text-lg">{skill.name}</h3>
            <div className="w-full bg-gray-800 rounded-full h-4 mt-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="h-full bg-primaryTeal rounded-full"
              ></motion.div>
            </div>
            <span className="mt-2 text-sm">{skill.proficiency}%</span>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <h2 className="text-4xl font-semibold text-center text-softGlow mt-20 mb-12 animate-pulseGlow">
        My Portfolio Stats
      </h2>
      <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col items-center bg-darkTealBlue rounded-2xl p-6 shadow-glow-primary hover:shadow-glow-hover transition-transform cursor-pointer min-w-[120px]"
          >
            <motion.span
              className="text-3xl font-bold text-primaryTeal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {stat.value}
            </motion.span>
            <span className="text-lightText mt-2 text-center">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
