'use client';
import Link from "next/link";
import { Calendar, ArrowRight, Clock, Terminal } from "lucide-react";

export default function BlogPostCard() {
    const recentPosts = [
        {
            id: 1,
            date: "Oct 28, 2025",
            readTime: "8 min read",
            title: "Upgradable Smart Contracts: Ensuring Flexibility in Blockchain",
            excerpt: "Discover how to implement proxy patterns and upgradable smart contracts in Solidity. Learn about different upgrade strategies and best practices.",
            category: "Blockchain",
            tags: ["Solidity", "Web3", "Smart Contracts"]
        },
        {
            id: 2,
            date: "Oct 29, 2025",
            readTime: "6 min read",
            title: "Building Full-Stack dApps with Next.js and Ethereum",
            excerpt: "A comprehensive guide to building decentralized applications using Next.js, Web3.js, and smart contracts.",
            category: "Development",
            tags: ["Next.js", "Ethereum", "dApps"]
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-6 font-mono">
            {recentPosts.map((post) => (
                <article
                    key={post.id}
                    className="group relative bg-gray-900/30 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-primary/40 hover:bg-gray-900/50"
                >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Header - Meta and Category */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {post.date}
                            </span>
                            <span className="text-gray-700">•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                        </div>
                        <span className="px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary text-xs rounded flex items-center gap-1.5">
                            <Terminal size={12} />
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
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

                    {/* Read More */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                        <Link
                            href={`/blogpost/${post.id}`}
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
