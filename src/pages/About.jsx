import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const timeline = [
  { year: '2023', title: 'Starting Coding', desc: 'Began my journey in coding.' },
  { year: '2024', title: 'Web Development', desc: 'Explored modern web development techniques.' },
  { year: '2025', title: 'Doing Projects or Internship', desc: 'Gained hands-on experience through real-world projects and internships.' },
  { year: '2026', title: 'Exploring new technologies like Web-Dev or AI, DSA', desc: 'Stayed up-to-date with the latest trends and tools in web development.' },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-purple-50 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-black/20 dark:border-white/20 mb-6"
    >
      <div className="text-2xl font-bold text-purple-400 min-w-[100px]">{item.year}</div>
      <div>
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="text-gray-400">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8"
      >
        About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left column: professional summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I’m a passionate Full Stack Developer with a strong foundation in building scalable, responsive, and user-centric web applications. I work across both frontend and backend technologies, including HTML, CSS, JavaScript, React.js, Node.js, and MongoDB, allowing me to develop complete end-to-end solutions.

            Currently, I’m gaining hands-on experience through my web development internship at UptoSkills, where I contribute to real-world projects, collaborate with teams, and continuously refine my technical and problem-solving skills. I have also worked on projects like a collaborative code editor and full-stack applications, focusing on performance, clean architecture, and seamless user experience.

            I enjoy designing intuitive interfaces, building robust APIs, and optimizing applications for speed and scalability. I’m always eager to learn new technologies and stay aligned with industry best practices.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            My goal is to grow as a Full Stack Developer and build impactful digital products that solve real-world problems.
          </p>
          {/* Interests */}
          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {['Web Development', '3D Graphics', 'UI/UX', 'Open Source', 'Gaming'].map((item) => (
                <span key={item} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column: timeline */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">My Journey</h2>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}