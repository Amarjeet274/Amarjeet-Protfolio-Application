import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiUser, FiCpu } from 'react-icons/fi';
import Counter from '../components/Counter';

const stats = [
  { label: 'Projects', value: '2+', icon: FiCode },
  { label: 'Experience', value: '0', icon: FiUser },
  { label: 'Skills', value: '20+', icon: FiCpu },
];

const navTiles = [
  { to: '/about', label: 'About', color: 'from-blue-500 to-cyan-500' },
  { to: '/skills', label: 'Skills', color: 'from-green-500 to-emerald-500' },
  { to: '/projects', label: 'Projects', color: 'from-purple-500 to-pink-500' },
  { to: '/achievements', label: 'Achievements', color: 'from-yellow-500 to-orange-500' },
  { to: '/contact', label: 'Contact', color: 'from-orange-500 to-red-500' },
];

function StatCard({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center p-6 bg-purple-50 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-black/20 dark:border-white/20"
    >
      <Icon className="text-4xl text-purple-400 mb-3" />
      <span className="text-4xl font-bold text-gray-900 dark:text-white">
        {typeof stat.value === 'number' ? (
          <Counter from={0} to={stat.value} />
        ) : (
          stat.value
        )}
      </span>
      <span className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</span>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold">
          Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Amarjeet Maurya</span>
        </h1>
        <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Full‑Stack Developer with a passion for creating immersive digital experiences.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Navigation Tiles */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {navTiles.map((tile) => (
          <motion.div
            key={tile.to}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className="perspective-1000"
          >
            <Link
              to={tile.to}
              className={`block p-8 rounded-2xl bg-gradient-to-br ${tile.color} shadow-xl transform-gpu transition-all duration-300 hover:shadow-2xl`}
            >
              <h2 className="text-3xl font-bold text-white">{tile.label}</h2>
              <p className="mt-2 text-white/80">Learn more →</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}