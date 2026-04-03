import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout';

// Public Pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/Projects';
import ProjectForm from './pages/admin/ProjectForm';
import AdminSkills from './pages/admin/Skills';
import AdminProfile from './pages/admin/Profile';
import ProtectedRoute from './components/admin/ProtectedRoute';

function PublicAnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/skills" element={<Layout><Skills /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/achievements" element={<Layout><Achievements /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Animated public routes */}
      <PublicAnimatedRoutes />

      {/* Admin Routes (no layout / no animation) */}
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/projects/new" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
        <Route path="/admin/projects/:id" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
        <Route path="/admin/skills" element={<ProtectedRoute><AdminSkills /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
      </Routes>

      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;