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
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 font-mono grid-background relative">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 sm:mb-12 lg:mb-16">
                    {/* Terminal Breadcrumb */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base lg:text-xl text-gray-600 mb-4 sm:mb-6 overflow-x-auto">
                        <Terminal size={16} className="text-primary flex-shrink-0 sm:w-5 sm:h-5" />
                        <span className="text-gray-700">~</span>
                        <span className="text-primary whitespace-nowrap">/blogs</span>
                        <span className="animate-pulse ml-1">▊</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                        {/* Blog<span className="text-primary">.</span> */}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                        Chronicles of code, chaos & creative problem-solving
                    </p>
                </div>

                {/* Blog Posts */}
                <section className="mb-10 sm:mb-12 lg:mb-16">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Code size={18} className="text-primary flex-shrink-0 sm:w-5 sm:h-5" />
                            <h2 className="text-lg sm:text-xl font-bold text-white">Latest Articles</h2>
                        </div>
                        <div className="flex-1 h-px bg-gray-800 hidden sm:block"></div>
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                            {blogCount} {blogCount === 1 ? 'post' : 'posts'}
                        </span>
                    </div>
                    <BlogPostCard limit={displayedBlogs} />
                </section>

                {/* Load More - Only show if there are more blogs */}
                {hasMore && (
                    <div className="text-center px-4">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-800 text-gray-400 rounded-lg hover:border-primary/50 hover:text-primary active:scale-[0.98] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {loading ? (
                                <>
                                    <Loader size={16} className="animate-spin flex-shrink-0" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <>
                                    <span className="hidden sm:inline">
                                        Load More Articles ({blogCount - displayedBlogs} remaining)
                                    </span>
                                    <span className="sm:hidden">
                                        Load More ({blogCount - displayedBlogs})
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* No more posts indicator */}
                {!hasMore && blogCount > 0 && (
                    <div className="text-center py-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/30 border border-gray-800 rounded-lg text-gray-500 text-sm">
                            <Terminal size={14} className="text-primary" />
                            <span>You've reached the end</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
