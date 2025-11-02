'use client';
import { Calendar, Clock, Tag, GitCommit, BookOpen, Cpu, ArrowLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPost() {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Top Navigation Bar */}
            <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-mono"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to blogs</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-900/50">
                            <Share2 size={18} />
                        </button>
                        <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={`p-2 rounded-lg transition-all ${isBookmarked
                                    ? 'text-primary bg-primary/10'
                                    : 'text-gray-400 hover:text-primary hover:bg-gray-900/50'
                                }`}
                        >
                            <Bookmark size={18} className={isBookmarked ? 'fill-primary' : ''} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 font-mono text-gray-300 flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="lg:w-72 flex-shrink-0">
                    <div className="lg:sticky lg:top-28 space-y-6">
                        {/* Metadata Card */}
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30 space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Published</div>
                                    <div className="text-white">May 15, 2025</div>
                                </div>
                            </div>
                            <div className="h-px bg-gray-800"></div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Reading time</div>
                                    <div className="text-white">8 minutes</div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="h-4 w-4 text-primary" />
                                <h3 className="text-sm font-medium text-white">Topics</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Solidity', 'Blockchain', 'Smart Contracts'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary rounded text-xs hover:bg-primary/20 transition-colors cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Table of Contents */}
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <h3 className="text-sm font-medium text-white">Contents</h3>
                            </div>
                            <nav className="space-y-3 text-sm">
                                {[
                                    { id: 'what-are', title: 'What are Upgradable Smart Contracts?' },
                                    { id: 'why-need', title: 'Why We Need Them' },
                                    { id: 'types', title: 'Types of Upgradable Contracts' }
                                ].map((item, index) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="flex items-start gap-2 text-gray-400 hover:text-primary transition-colors group"
                                    >
                                        <span className="text-gray-600 group-hover:text-primary">{String(index + 1).padStart(2, '0')}.</span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <article className="flex-1 max-w-3xl">
                    {/* Article Header */}
                    <header className="mb-12 pb-8 border-b border-gray-800">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                            Upgradable Smart Contracts: Ensuring Flexibility in Blockchain Applications
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Complete Tutorial on How to upgrade your smart contract for flexibility
                        </p>
                    </header>

                    {/* Content */}
                    <div className="space-y-12">
                        {/* Section 1 */}
                        <section id="what-are">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                                    <Cpu className="h-5 w-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    What are Upgradable Smart Contracts?
                                </h2>
                            </div>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    Upgrading smart contracts refers to the ability to modify or extend the functionality of a deployed smart contract without disrupting the existing system or requiring users to interact with a new contract. This is particularly challenging due to the immutable nature of blockchain, where deployed contracts cannot be changed.
                                </p>
                                <p>
                                    Upgradable smart contracts solve this by allowing changes while maintaining the same contract address, thus preserving state and user interactions.
                                </p>
                            </div>
                        </section>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

                        {/* Section 2 */}
                        <section id="why-need">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Why Do We Need Upgradable Smart Contracts?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: 'Bug Fixes and Security Patches',
                                        desc: 'Smart contracts, like any software, can have bugs or vulnerabilities discovered post-deployment. Upgrades allow these issues to be addressed without requiring users to switch to a new contract.'
                                    },
                                    {
                                        title: 'Feature Enhancements',
                                        desc: 'As dApps evolve, new features or improvements may be needed. Upgradable contracts enable adding these enhancements seamlessly.'
                                    },
                                    {
                                        title: 'Compliance and Regulations',
                                        desc: 'Regulatory environments can change, necessitating updates to contract logic to ensure ongoing compliance.'
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4 p-5 bg-gray-900/30 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

                        {/* Section 3 */}
                        <section id="types">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Types of Upgradable Smart Contracts
                            </h2>
                            <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/30">
                                <div className="bg-gray-900/70 px-6 py-4 border-b border-gray-800 flex items-center gap-3">
                                    <span className="px-2 py-1 bg-primary/10 border border-primary/30 text-primary rounded text-xs font-mono">
                                        01
                                    </span>
                                    <h3 className="font-semibold text-white">
                                        Not Really Upgrading (Parametrizing Everything)
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        This approach involves designing contracts with parameters that can be adjusted without changing the contract code.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Pros */}
                                        <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                                            <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                                Pros
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-400">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-0.5">✓</span>
                                                    <span>Simple to implement</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-0.5">✓</span>
                                                    <span>No complex upgrade mechanisms required</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Cons */}
                                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                                            <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                                Cons
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-400">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-0.5">✗</span>
                                                    <span>Limited flexibility as future changes must be anticipated</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    );
}
