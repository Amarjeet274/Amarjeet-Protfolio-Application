import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// You can replace this static data with API calls if you want dynamic content
const achievements = [
  {
    id: 1,
    title: 'Samsung Innovation Campus – Phase III (AI Training)',
    issuer: 'By Samsung',
    date: '2025',
    description: 'Completed Artifical intelligence training in Samsung innovation campus.',
    icon: '🏆',
    category: 'academic',
  },
  {
    id: 2,
    title: 'Full-Stack Developer internship',
    issuer: 'By Uptoskills',
    date: '2026',
    description: 'Recognized for outstanding contributions to open-source full-stack projects.',
    icon: '🥇',
    category: 'certification',
  },
];

const categories = ['all', 'certification', 'award', 'achievement', 'academic'];

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredAchievements, setFilteredAchievements] = useState(achievements);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredAchievements(achievements);
    } else {
      setFilteredAchievements(achievements.filter(a => a.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
      >
        Achievements & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recognitions</span>
      </motion.h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full capitalize transition ${activeCategory === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-600/10 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/20'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {filteredAchievements.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-purple-50 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-black/20 dark:border-white/20 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{item.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-purple-400">{item.issuer}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredAchievements.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No achievements in this category yet.</p>
      )}
    </div>
  );
}