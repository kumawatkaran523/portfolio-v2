'use client';
import { Terminal, Code, Loader } from "lucide-react";
import BlogPostCard from "../components/PostCard";
import { useState, useEffect } from "react";

export default function Blogs() {
    const [blogCount, setBlogCount] = useState(0);
    const [displayedBlogs, setDisplayedBlogs] = useState(6); // Show 6 initially
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.pagination) {
                    setBlogCount(data.pagination.total);
                }
            } catch (error) {
                console.error('Error fetching blog count:', error);
            }
        };

        fetchCount();
    }, []);

    const handleLoadMore = () => {
        setLoading(true);
        // Simulate loading delay
        setTimeout(() => {
            setDisplayedBlogs(prev => prev + 6);
            setLoading(false);
        }, 500);
    };

    // Check if there are more blogs to load
    const hasMore = displayedBlogs < blogCount;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-6 py-16 font-mono grid-background relative">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-16">
                    {/* Terminal Breadcrumb */}
                    <div className="flex items-center gap-2 text-xl text-gray-600 mb-6">
                        <Terminal size={20} className="text-primary" />
                        <span className="text-gray-700">~</span>
                        <span className="text-primary">/blogs</span>
                        <span className="animate-pulse ml-1">▊</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white mb-4">
                        {/* Blog<span className="text-primary">.</span> */}
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
                        Chronicles of code, chaos & creative problem-solving
                    </p>
                </div>

                {/* Blog Posts */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Code size={20} className="text-primary" />
                        <h2 className="text-xl font-bold text-white">Latest Articles</h2>
                        <div className="flex-1 h-px bg-gray-800"></div>
                        <span className="text-sm text-gray-600">{blogCount} {blogCount === 1 ? 'post' : 'posts'}</span>
                    </div>
                    <BlogPostCard limit={displayedBlogs} />
                </section>

                {/* Load More - Only show if there are more blogs */}
                {hasMore && (
                    <div className="text-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="px-6 py-3 bg-gray-900/50 border border-gray-800 text-gray-400 rounded-lg hover:border-primary/50 hover:text-primary transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                        >
                            {loading ? (
                                <>
                                    <Loader size={16} className="animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                `Load More Articles (${blogCount - displayedBlogs} remaining)`
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
