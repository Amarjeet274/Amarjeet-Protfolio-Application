import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Static fallback data (same as before)
const staticProjects = [
  {
    id: 1,
    title: '3D Portfolio',
    description: 'Immersive 3D portfolio built with React Three Fiber.',
    tech: ['React', 'Three.js', 'Tailwind'],
    category: 'frontend',
    image: '/assets/my.png',
    demo: 'https://amarjeet-maurya.vercel.app',
    github: 'https://github.com/amarjeet274/my-portfolio-website',
  },
  {
    id: 2,
    title: 'E-Commerce API',
    description: 'RESTful API for an e-commerce platform with authentication.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    category: 'backend',
    image: '/images/project2.jpg',
    demo: 'https://ecommerce-api-demo.herokuapp.com',
    github: 'https://github.com/amarjeet274/ecommerce-api',
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Full-stack task management application with real-time updates.',
    tech: ['React', 'Node.js', 'Firebase'],
    category: 'fullstack',
    image: '/images/project3.jpg',
    demo: 'https://task-manager-app.vercel.app',
    github: 'https://github.com/amarjeet-maurya/task-manager',
  },
];

const filters = ['all', 'frontend', 'backend', 'fullstack'];

export default function Projects() {
  const [projects, setProjects] = useState(staticProjects); // start with fallback
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        // Map backend fields to match the shape expected by the component
        const mappedProjects = data.map(p => ({
          id: p._id,                // use _id as id (string)
          title: p.title,
          description: p.description,
          tech: p.tech,
          category: p.category,
          image: p.image,
          demo: p.demoLink,          // backend uses demoLink
          github: p.githubLink,       // backend uses githubLink
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to staticProjects already set
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    activeFilter === 'all' ? true : p.category === activeFilter
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
      >
        My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
      </motion.h1>

      {/* Filter buttons */}
      <div className="flex justify-center gap-4 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full capitalize transition ${activeFilter === filter
              ? 'bg-purple-600 text-white'
              : 'bg-gray-600/10 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-white/20'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}   // can be string or number
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10, boxShadow: '0 20px 30px -10px rgba(139, 92, 246, 0.5)' }}
              className="bg-purple-50 dark:bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-black/20 dark:border-white/20 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-purple-500/20 rounded text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal for project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-2xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-gray-300 text-2xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-300 mb-4">{selectedProject.description}</p>
              <div className="flex gap-4">
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-800 hover:to-pink-600 transition"
                >
                  Live Demo
                </a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-800 hover:to-pink-600 transition"
                >
                  GitHub
                </a>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white text-lg flex items-center justify-center hover:bg-white/50"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}