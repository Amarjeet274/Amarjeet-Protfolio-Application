import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiCode, FiCamera, FiStar } from 'react-icons/fi';
import Scene from '../components/Scene';
import FloatingShape from '../components/FloatingShape';
import profileImg from '../assets/amarjeetmaurya.png'; 

// Glowing floating icons configuration
const floatingItems = [
  { Icon: FiGithub, color: '#8b5cf6', delay: 0, duration: 8, left: '10%', top: '20%' },
  { Icon: FiLinkedin, color: '#0077b5', delay: 1, duration: 9, left: '80%', top: '15%' },
  { Icon: FiTwitter, color: '#1DA1F2', delay: 2, duration: 7, left: '15%', top: '70%' },
  { Icon: FiCode, color: '#ec4899', delay: 1.5, duration: 10, left: '85%', top: '80%' },
  { Icon: FiCamera, color: '#10b981', delay: 2.5, duration: 8, left: '70%', top: '30%' },
  { Icon: FiStar, color: '#fbbf24', delay: 0.5, duration: 6, left: '25%', top: '50%' },
];

// Falling stars configuration
const fallingStars = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
  size: Math.random() * 4 + 2, // 2-6px
  opacity: 0.3 + Math.random() * 0.5,
}));

export default function Landing() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <Scene cameraPosition={[0, 0, 8]}>
        <FloatingShape />
      </Scene>

      {/* Falling Stars */}
      {fallingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white z-20"
          style={{
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
          initial={{ top: '-10%', opacity: 0 }}
          animate={{
            top: '110%',
            opacity: [0, star.opacity, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: 'linear',
            times: [0, 0.1, 0.9, 1],
          }}
        />
      ))}

      {/* Glowing Floating Icons */}
      {floatingItems.map(({ Icon, color, delay, duration, left, top }, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl z-20"
          style={{
            left,
            top,
            color,
            filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -30, 30, 0],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            times: [0, 0.3, 0.7, 1],
          }}
        >
          <Icon />
        </motion.div>
      ))}

      {/* Main Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass-card p-10 text-center max-w-lg mx-4"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-purple-400 shadow-xl"
          >
            <img src={profileImg} alt="Amarjeet Maurya" className="w-full h-full object-cover" />
            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-4xl text-purple-400">
              👤
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Amarjeet Maurya
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Full‑Stack Developer and also a passionate learner with a love for creating immersive digital experiences. Welcome to my portfolio!
          </p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              to="/home"
              className="inline-block px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition"
            >
              Enter
            </Link>
          </motion.div>
        </motion.div>
      </div>
      

      {/* Static Social Icons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
          <FiGithub size={24} />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
          <FiLinkedin size={24} />
        </a>
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
          <FiTwitter size={24} />
        </a>
      </div>
    </div>
  );
}