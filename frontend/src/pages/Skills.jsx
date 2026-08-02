import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiJavascript, SiPython, SiFigma, SiVite, SiHtml5 } from 'react-icons/si';


const skillCategories = [
  {
    name: 'Frontend',
    skills: ['React', 'HTML', 'Tailwind CSS', 'JavaScript'],
    color: '#8b5cf6',
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'MongoDB'],
    color: '#10b981',
  },
  {
    name: 'Tools',
    skills: ['Git', 'Figma', 'Vite'],
    color: '#f59e0b',
  },
];

// Icon mapping
const skillIcons = {
  React: <FaReact />,
  HTML: <SiHtml5 />,
  'Tailwind CSS': <SiTailwindcss />,
  JavaScript: <SiJavascript />,
  'Node.js': <FaNodeJs />,
  Express: <FaNodeJs />, // fallback icon
  Python: <SiPython />,
  MongoDB: <SiMongodb />,
  Git: <FaGitAlt />,
  Docker: <FaDocker />,
  Figma: <SiFigma />,
  Vite: <SiVite />,
};

export default function Skills() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        Technical{' '}
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Skills
        </span>
      </motion.h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-purple-50 dark:bg-black/25 backdrop-blur-lg rounded-2xl p-6 border border-black/20 dark:border-white/20 hover:shadow-xl transition"
          >
            {/* Category Title */}
            <h2
              className="text-2xl font-semibold mb-6 text-center"
              style={{ color: category.color }}
            >
              {category.name}
            </h2>

            {/* Icon Grid */}
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {category.skills.map((skill) => (
                <div key={skill} className="group relative flex flex-col items-center">
                  
                  {/* Icon Box */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 hover:shadow-lg transition">
                    <div
                      className="text-3xl"
                      style={{ color: category.color }}
                    >
                      {skillIcons[skill]}
                    </div>
                  </div>

                  {/* Tooltip */}
                  <span className="absolute -bottom-6 text-xs opacity-0 group-hover:opacity-100 transition text-gray-600 dark:text-gray-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Skill List (optional fallback) */}
            <ul className="mt-6 space-y-2 text-black-500 dark:text-gray-300 text-sm">
              {category.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}