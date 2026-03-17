import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/admin/projects" className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition">
            <h2 className="text-xl font-semibold mb-2">Manage Projects</h2>
            <p className="text-gray-400">Add, edit or delete portfolio projects</p>
          </Link>
          <Link to="/admin/skills" className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition">
            <h2 className="text-xl font-semibold mb-2">Manage Skills</h2>
            <p className="text-gray-400">Update your technical skills</p>
          </Link>
          <Link to="/admin/profile" className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition">
            <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
            <p className="text-gray-400">Change name, bio, photo, social links</p>
          </Link>
        </div>
      </div>
    </div>
  );
}