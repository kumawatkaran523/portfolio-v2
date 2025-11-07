'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, Loader } from 'lucide-react';
import Link from 'next/link';

interface Blog {
    id: number;
    title: string;
    slug: string;
    subTitle: string;
    publishedDate: string;
    readTime: string;
    tags: string[];
    views: number;
    featured: boolean;
}

export default function BlogsManagement() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs?limit=100`);
            const data = await response.json();
            setBlogs(data.data || []);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        setDeleting(id);
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setBlogs(blogs.filter(blog => blog.id !== id));
                alert('Blog deleted successfully!');
            } else {
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Error deleting blog');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin mx-auto mb-4 text-primary" size={32} />
                    <p className="text-gray-400">Loading blog...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Blogs</h1>
                    <p className="text-gray-500">Manage your blog posts</p>
                </div>
                <Link
                    href="/admin/dashboard/blogs/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all"
                >
                    <Plus size={20} />
                    <span>New Blog</span>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Total Blogs</p>
                    <p className="text-2xl font-bold text-primary">{blogs.length}</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Featured</p>
                    <p className="text-2xl font-bold text-primary">{blogs.filter(b => b.featured).length}</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Total Views</p>
                    <p className="text-2xl font-bold text-primary">{blogs.reduce((sum, b) => sum + b.views, 0)}</p>
                </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-900/50 border-b border-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Published</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tags</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No blogs found. Create your first blog!
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-900/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white font-medium">{blog.title}</p>
                                                <p className="text-gray-500 text-sm">{blog.slug}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(blog.publishedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {blog.tags.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {blog.tags.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                                                        +{blog.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Eye size={14} />
                                                {blog.views}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {blog.featured ? (
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
                                                    href={`/admin/dashboard/blogs/edit/${blog.slug}`}
                                                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    disabled={deleting === blog.id}
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
