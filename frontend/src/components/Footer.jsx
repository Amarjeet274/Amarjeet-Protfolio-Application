import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const socialLinks = [
  { icon: FiGithub, url: 'https://github.com/amarjeet274', label: 'GitHub' },
  { icon: FiLinkedin, url: 'https://linkedin.com/in/amarjeet-maurya', label: 'LinkedIn' },
  { icon: SiLeetcode, url: 'https://leetcode.com/u/amarjeet274/', labels: 'Leetcode' },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="py-6 border-t border-black/20 dark:border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-600">
            © {new Date().getFullYear()} Amarjeet Maurya. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-600 hover:text-purple-600 transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}