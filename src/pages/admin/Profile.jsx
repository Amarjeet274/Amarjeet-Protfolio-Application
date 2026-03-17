import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminProfile() {
  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    email: '',
    profilePhoto: '',
    socialLinks: { github: '', linkedin: '', twitter: '' },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`);
      const data = await res.json();
      if (data) setForm(data);
    } catch {
      toast.error('Failed to load profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const social = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [social]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Profile updated');
      } else {
        toast.error('Failed to update');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 bg-white/10 rounded" />
          </div>
          <div>
            <label className="block mb-1">Role (e.g., Full‑Stack Developer)</label>
            <input name="role" value={form.role} onChange={handleChange} className="w-full p-2 bg-white/10 rounded" />
          </div>
          <div>
            <label className="block mb-1">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="4" className="w-full p-2 bg-white/10 rounded" />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2 bg-white/10 rounded" />
          </div>
          <div>
            <label className="block mb-1">Profile Photo URL</label>
            <input name="profilePhoto" value={form.profilePhoto} onChange={handleChange} className="w-full p-2 bg-white/10 rounded" />
          </div>
          <h2 className="text-xl mt-4 mb-2">Social Links</h2>
          <div>
            <label className="block mb-1">GitHub</label>
            <input name="social.github" value={form.socialLinks.github} onChange={handleChange} className="w-full p-2 bg-white/10 rounded" />
          </div>
          <div>
            <label className="block mb-1">LinkedIn</label>
            <input name="social.linkedin" value={form.socialLinks.linkedin} onChange={handleChange} className="w-full p-2 bg-white/10 rounded" />
          </div>
          <div>
            <label className="block mb-1">Twitter</label>
            <input name="social.twitter" value={form.socialLinks.twitter} onChange={handleChange} className="w-full p-2 bg-white/10 rounded" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2 bg-purple-600 rounded">
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}