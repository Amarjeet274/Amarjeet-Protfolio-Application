/**
 * Example: Using the new API Service Layer
 * This shows how to refactor components to use the centralized API service
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import APIService from '../../services/api';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await APIService.get('/api/projects');
      setProjects(data);
    } catch (error) {
      toast.error(error.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await APIService.delete(`/api/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      toast.error(error.message || 'Failed to delete');
    }
  };

  if (loading) return <div className="text-center p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <Link
            to="/admin/projects/new"
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            + Add New Project
          </Link>
        </div>
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.description.substring(0, 100)}...</p>
              </div>
              <div className="space-x-2">
                <Link
                  to={`/admin/projects/${project._id}`}
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
