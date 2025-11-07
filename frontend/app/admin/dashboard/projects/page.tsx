'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    featured: boolean;
    startDate: string;
    endDate?: string;
    thumbnail?: string;
}

export default function ProjectsManagement() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?limit=100`);
            const data = await response.json();
            setProjects(data.data || []);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        setDeleting(id);
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setProjects(projects.filter(project => project.id !== id));
                alert('Project deleted successfully!');
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Error deleting project');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-gray-400">Loading projects...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-gray-500">Manage your portfolio projects</p>
                </div>
                <Link
                    href="/admin/dashboard/projects/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all"
                >
                    <Plus size={20} />
                    <span>New Project</span>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Total Projects</p>
                    <p className="text-2xl font-bold text-primary">{projects.length}</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Featured</p>
                    <p className="text-2xl font-bold text-primary">{projects.filter(p => p.featured).length}</p>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-900/50 border-b border-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tech Stack</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No projects found. Create your first project!
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-900/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white font-medium">{project.title}</p>
                                                <p className="text-gray-500 text-sm">{project.description.substring(0, 40)}...</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {project.techStack.slice(0, 2).map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                                                        +{project.techStack.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(project.startDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.featured ? (
                                                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/30">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                                                    Regular
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/dashboard/projects/edit/${project.id}`}
                                                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    disabled={deleting === project.id}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
