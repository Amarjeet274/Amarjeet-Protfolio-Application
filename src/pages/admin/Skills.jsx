import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', category: '', level: 50, color: '#8b5cf6' });
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false); // for add button loading

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      toast.error('Failed to load skills: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newSkill.name) {
      toast.error('Skill name is required');
      return;
    }

    // Check if token exists
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('You are not logged in. Please log in again.');
      return;
    }

    setAdding(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSkill),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Skill added');
        setNewSkill({ name: '', category: '', level: 50, color: '#8b5cf6' });
        fetchSkills(); // refresh list
      } else {
        // Show specific error from backend
        toast.error(data.error || 'Failed to add skill');
      }
    } catch (err) {
      toast.error('Network error: ' + err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('You are not logged in.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success('Deleted');
        fetchSkills();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete');
      }
    } catch (err) {
      toast.error('Network error: ' + err.message);
    }
  };

  if (loading) return <div className="text-center p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>

        {/* Add skill form */}
        <div className="mb-8 bg-white/10 p-4 rounded-lg">
          <h2 className="text-xl mb-4">Add New Skill</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <input
              placeholder="Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="p-2 bg-black/20 rounded"
            />
            <input
              placeholder="Category"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="p-2 bg-black/20 rounded"
            />
            <input
              type="number"
              placeholder="Level (1-100)"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: +e.target.value })}
              className="p-2 bg-black/20 rounded"
            />
            <input
              type="color"
              value={newSkill.color}
              onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
              className="p-2 bg-black/20 rounded h-10"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={adding}
            className={`mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition ${
              adding ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {adding ? 'Adding...' : 'Add Skill'}
          </button>
        </div>

        {/* Skills list */}
        <div className="grid gap-4">
          {skills.length === 0 ? (
            <p className="text-gray-400">No skills added yet.</p>
          ) : (
            skills.map((skill) => (
              <div key={skill._id} className="flex justify-between items-center bg-white/10 p-4 rounded">
                <div>
                  <span className="font-bold" style={{ color: skill.color }}>{skill.name}</span>
                  <span className="ml-4 text-sm text-gray-400">{skill.category}</span>
                  <span className="ml-4 text-sm">Level: {skill.level}</span>
                </div>
                <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-300">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}