import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

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
    skills: ['Git', 'Docker', 'Figma', 'Vite'],
    color: '#f59e0b',
  },
];

function SkillCube({ category }) {
  return (
    <group>
      {/* Simple rotating cube with text on each face */}
      {category.skills.map((skill, i) => (
        <Box key={i} position={[0, 0, 0]} scale={0.8}>
          <meshStandardMaterial color={category.color} emissive={category.color} emissiveIntensity={0.2} />
          <Text
            position={[0, 0, 0.51]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        </Box>
      ))}
    </group>
  );
}

export default function Skills() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        Technical <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Skills</span>
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-purple-50 dark:bg-black/25 backdrop-blur-lg rounded-2xl p-6 border border-black/20 dark:border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center" style={{ color: category.color }}>
              {category.name}
            </h2>

            {/* 3D Canvas for skill cube */}
            <div className="h-48 w-full">
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                  <SkillCube category={category} />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
            </div>

            {/* Fallback list of skills */}
            <ul className="mt-4 space-y-2 text-black-500 dark:text-gray-300">
              {category.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></span>
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