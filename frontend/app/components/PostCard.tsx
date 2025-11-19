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
                console.log('Fetching from:', url);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();
                console.log('API Response:', data);

                if (data.success && Array.isArray(data.data)) {
                    console.log('Found', data.data.length, 'blogs');
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
            <div className="grid grid-cols-1 gap-4 sm:gap-6 font-mono">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 sm:p-6 animate-pulse">
                        <div className="h-3 sm:h-4 bg-gray-800 rounded w-1/3 sm:w-1/4 mb-3 sm:mb-4"></div>
                        <div className="h-4 sm:h-5 bg-gray-800 rounded w-full mb-2 sm:mb-3"></div>
                        <div className="h-3 sm:h-4 bg-gray-800 rounded w-full mb-3 sm:mb-4"></div>
                        <div className="h-3 bg-gray-800 rounded w-2/3 sm:w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 sm:p-6 text-center">
                <p className="text-red-400 font-semibold mb-2 text-sm sm:text-base">❌ Error Loading Blogs</p>
                <p className="text-red-300 text-xs sm:text-sm break-words">{error}</p>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 sm:p-12 text-center">
                <p className="text-gray-400 text-base sm:text-lg">No blogs found yet.</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">Create your first blog in the admin dashboard!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 font-mono">
            {posts.map((post) => (
                <article
                    key={post.id}
                    className="group relative bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:border-primary/40 hover:bg-gray-900/70 active:scale-[0.99]"
                >
                    {/* Header - Meta and Category */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Calendar size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0" />
                                <span className="whitespace-nowrap">
                                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </span>
                            <span className="text-gray-700 hidden sm:inline">•</span>
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Clock size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0" />
                                <span className="whitespace-nowrap">{post.readTime}</span>
                            </span>
                        </div>
                        <span className="px-2 sm:px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs rounded flex items-center gap-1 sm:gap-1.5 w-fit">
                            <Terminal size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
                            <span className="truncate max-w-[120px] sm:max-w-none">
                                {post.tags && post.tags.length > 0 ? post.tags[0] : 'General'}
                            </span>
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                        {post.subTitle}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            {post.tags.slice(0, 4).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-1.5 sm:px-2 py-0.5 bg-gray-800/50 border border-gray-700 rounded text-[10px] sm:text-xs text-gray-500 whitespace-nowrap"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {post.tags.length > 4 && (
                                <span className="px-1.5 sm:px-2 py-0.5 bg-gray-800/50 border border-gray-700 rounded text-[10px] sm:text-xs text-gray-500">
                                    +{post.tags.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                        <Link
                            href={`/blogpost/${post.slug}`}
                            className="flex items-center gap-1.5 sm:gap-2 text-primary/80 hover:text-primary transition-colors text-xs sm:text-sm font-medium"
                        >
                            <span>Read Full Article</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </Link>

                    </div>
                </article>
            ))}
        </div>
    );
}
