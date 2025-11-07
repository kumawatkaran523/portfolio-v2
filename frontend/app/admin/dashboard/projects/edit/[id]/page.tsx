'use client';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditProject() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [isInitializing, setIsInitializing] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        repoLink: '',
        liveLink: '',
        thumbnail: '',
        featured: false,
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (!id) return;

        const fetchProject = async () => {
            try {
                setIsInitializing(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);

                if (!response.ok) {
                    throw new Error('Project not found');
                }

                const data = await response.json();

                if (data.success && data.data) {
                    const project = data.data;
                    setFormData({
                        title: project.title || '',
                        description: project.description || '',
                        techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
                        repoLink: project.repoLink || '',
                        liveLink: project.liveLink || '',
                        thumbnail: project.thumbnail || '',
                        featured: project.featured || false,
                        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
                        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
                    });
                } else {
                    throw new Error('Invalid response');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'Failed to load project');
            } finally {
                setIsInitializing(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = localStorage.getItem('authToken');

        try {
            const payload = {
                ...formData,
                techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
                startDate: new Date(formData.startDate).toISOString(),
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Project updated successfully!');
                router.push('/admin/dashboard/projects');
            } else {
                alert(data.message || 'Failed to update project');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating project');
            setIsSubmitting(false);
        }
    };

    if (isInitializing) {
        return (
            <div className="text-center py-20 text-gray-400">
                <Loader className="animate-spin mx-auto mb-4" size={32} />
                Loading project...
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/projects" className="p-2 hover:bg-gray-900/50 rounded">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Edit Project</h1>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 text-lg mb-2">Failed to Load Project</p>
                    <p className="text-red-300 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/dashboard/projects"
                    className="p-2 hover:bg-gray-900/50 rounded transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Project</h1>
                    <p className="text-gray-500">Update project details</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="Project title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                            placeholder="Project description"
                        ></textarea>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Tech Stack (comma-separated)</label>
                        <input
                            type="text"
                            name="techStack"
                            value={formData.techStack}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="React, Next.js, TypeScript, Tailwind"
                        />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Thumbnail URL</label>
                        <input
                            type="url"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Repository Link</label>
                            <input
                                type="url"
                                name="repoLink"
                                value={formData.repoLink}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Live Link</label>
                            <input
                                type="url"
                                name="liveLink"
                                value={formData.liveLink}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                                placeholder="https://project.com"
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Start Date *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">End Date (Optional)</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    {/* Featured */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-800 text-primary"
                        />
                        <label htmlFor="featured" className="text-sm text-gray-400">
                            Mark as featured project
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}
                        {isSubmitting ? 'Updating...' : 'Update Project'}
                    </button>
                    <Link
                        href="/admin/dashboard/projects"
                        className="px-6 py-3 bg-gray-900/50 border border-gray-800 text-gray-400 rounded-lg hover:bg-gray-900 transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
