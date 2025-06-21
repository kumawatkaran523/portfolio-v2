import Link from "next/link";
import { ExternalLink, Github, Linkedin, Terminal, Twitter, Code } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-16 px-4 border-t border-primary/10 bg-[#0a0a0a] font-mono">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Profile Section */}
                    <div className="space-y-4 group">
                        <div className="flex items-center gap-4">
                            <div className="p-2">
                                <img
                                    src="/favicon.png"
                                    alt="pixelPenguin"
                                    width={60}
                                    height={60}
                                    className="rounded-lg group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white ">
                                    Karan Kumawat
                                </h3>
                                <p className="text-gray-400 ">
                                    Building decentralized futures
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm ">
                            Blockchain Developer • Open-Source Contributor • GSoC'25
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                Navigation
                            </h4>
                            <ul className="space-y-3">
                                {['Home', 'About', 'Projects'].map(link => (
                                    <li key={link}>
                                        <Link
                                            href={`/${link.toLowerCase()}`}
                                            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <span className="text-primary/0 hover:text-primary/80 transition-colors">~$</span>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                More
                            </h4>
                            <ul className="space-y-3">
                                {['Blog', 'Contact'].map(link => (
                                    <li key={link}>
                                        <Link
                                            href={`/${link.toLowerCase()}`}
                                            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <span className="text-primary/0 hover:text-primary/80 transition-colors">~$</span>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                            <Terminal className="h-4 w-4" />
                            Let's Connect
                        </h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-xs text-primary/60 mt-2">
                            kumawatkaran525@gmail.com
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm flex items-center hover:text-primary transition-colors">
                        © 2025 pixelpenguin.sh
                    </p>
                    <p className="text-gray-400 text-3xl font-princess hover:text-primary transition-colors">
                        deploying dreams onchain
                    </p>
                </div>
            </div>
        </footer>
    )
}