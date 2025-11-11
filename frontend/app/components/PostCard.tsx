'use client';
import Link from "next/link";
import { Calendar, ArrowRight, Clock, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

interface Blog {
    id: number;
    title: string;
    subTitle: string;
    slug: string;
    publishedDate: string;
    readTime: string;
    tags: string[];
    featured: boolean;
}
interface BlogPostCardProps {
    limit?: number;
}

export default function BlogPostCard({ limit = 100 }: BlogPostCardProps) {
    const [posts, setPosts] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;

                if (!apiUrl) {
                    throw new Error('API URL not configured');
                }

                const url = `${apiUrl}/api/blogs?page=1&${limit}`;
                console.log('📍 Fetching from:', url);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();
                console.log('✅ API Response:', data);

                if (data.success && Array.isArray(data.data)) {
                    console.log('✓ Found', data.data.length, 'blogs');
                    setPosts(data.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error('❌ Fetch Error:', err);
                const errorMsg = err instanceof Error ? err.message : 'Failed to fetch blogs';
                setError(errorMsg);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 font-mono">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 animate-pulse">
                        <div className="h-4 bg-gray-800 rounded w-1/4 mb-4"></div>
                        <div className="h-5 bg-gray-800 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-800 rounded w-full mb-4"></div>
                        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
                <p className="text-red-400 font-semibold mb-2">❌ Error Loading Blogs</p>
                <p className="text-red-300 text-sm">{error}</p>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-12 text-center">
                <p className="text-gray-400 text-lg">No blogs found yet.</p>
                <p className="text-gray-500 text-sm mt-2">Create your first blog in the admin dashboard!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 font-mono">
            {posts.map((post) => (
                <article
                    key={post.id}
                    className="group relative bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-primary/40 hover:bg-gray-900/50"
                >
                    {/* Header - Meta and Category */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="text-gray-700">•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                        </div>
                        <span className="px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary text-xs rounded flex items-center gap-1.5">
                            <Terminal size={12} />
                            {post.tags && post.tags.length > 0 ? post.tags[0] : 'General'}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {post.subTitle}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-0.5 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-500"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                        <Link
                            href={`/blogpost/${post.slug}`}
                            className="flex items-center gap-2 text-primary/80 hover:text-primary transition-colors text-sm"
                        >
                            <span>Read Full Article</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    );
}
