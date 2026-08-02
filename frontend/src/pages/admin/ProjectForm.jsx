import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    tech: '',
    category: '',
    image: '',
    demoLink: '',
    githubLink: '',
    featured: false,
  });

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
      const data = await res.json();
      setForm({ ...data, tech: data.tech.join(', ') });
    } catch {
      toast.error('Failed to load project');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `${import.meta.env.VITE_API_URL}/api/projects/${id}`
      : `${import.meta.env.VITE_API_URL}/api/projects`;

    const payload = {
      ...form,
      tech: form.tech.split(',').map((t) => t.trim()),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(`Project ${id ? 'updated' : 'created'}`);
        navigate('/admin/projects');
      } else {
        toast.error('Failed to save');
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
        <h1 className="text-3xl font-bold mb-8">{id ? 'Edit' : 'New'} Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Tech (comma separated)</label>
            <input
              type="text"
              name="tech"
              value={form.tech}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Demo URL</label>
            <input
              type="url"
              name="demoLink"
              value={form.demoLink}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">GitHub URL</label>
            <input
              type="url"
              name="githubLink"
              value={form.githubLink}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            <span>Featured</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </form>
      </div>
    </div>
  );
}