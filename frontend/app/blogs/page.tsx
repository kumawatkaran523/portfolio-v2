'use client';
import { Terminal, Code, Search, Tag } from "lucide-react";
import BlogPostCard from "../components/PostCard";
import { useState } from "react";

export default function Blogs() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Blockchain', 'Development', 'Web3', 'Tutorial'];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-6 py-16 font-mono">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-16">
                    {/* Terminal Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Terminal size={14} className="text-primary" />
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
                        <span className="text-sm text-gray-600">12 posts</span>
                    </div>
                    <BlogPostCard />
                </section>

                {/* Load More */}
                <div className="text-center">
                    <button className="px-6 py-3 bg-gray-900/50 border border-gray-800 text-gray-400 rounded-lg hover:border-primary/50 hover:text-primary transition-all font-medium">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );
}
