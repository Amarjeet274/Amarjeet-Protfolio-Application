export const socialLinks = [
  { platform: 'GitHub', url: 'https://github.com/amarjeet-maurya', icon: 'FiGithub' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/amarjeet-maurya', icon: 'FiLinkedin' },
  { platform: 'Twitter', url: 'https://twitter.com/amarjeet-maurya', icon: 'FiTwitter' },
];

export const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};