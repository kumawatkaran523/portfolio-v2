import Link from "next/link";
import { ExternalLink, Github, Linkedin, Terminal, Twitter, Code } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-primary/10 bg-[#0a0a0a] font-mono">
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4 group sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 relative flex-shrink-0">
                                <img
                                    src="/favicon.png"
                                    alt="pixelPenguin"
                                    width={50}
                                    height={50}
                                    className="w-12 h-12 sm:w-[60px] sm:h-[60px] rounded-lg group-hover:scale-110 transition-transform duration-300"
                                />
                                {/* Subtle glow on hover */}
                                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white">
                                    Karan Kumawat
                                </h3>
                                <p className="text-sm sm:text-base text-gray-400">
                                    Building decentralized futures
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm">
                            Blockchain Developer • Open-Source Contributor • GSoC'25
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                                <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                                Navigation
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {['Home', 'About', 'Projects'].map(link => (
                                    <li key={link}>
                                        <Link
                                            href={link === "Home" ? '/' : `/${link.toLowerCase()}`}
                                            className="text-sm sm:text-base text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="text-primary/0 group-hover:text-primary/80 transition-colors">~$</span>
                                            <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                                More
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {['Blog', 'Contact'].map(link => (
                                    <li key={link}>
                                        <Link
                                            href={`/${link.toLowerCase()}`}
                                            className="text-sm sm:text-base text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="text-primary/0 group-hover:text-primary/80 transition-colors">~$</span>
                                            <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
                        <h4 className="text-xs sm:text-sm uppercase tracking-wider text-primary flex items-center gap-2">
                            <Terminal className="h-3 w-3 sm:h-4 sm:w-4" />
                            Let's Connect
                        </h4>
                        <div className="flex gap-3 sm:gap-4">
                            <a
                                href="https://www.linkedin.com/in/karan-kumawat-26770b24a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10 hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://x.com/KaranKu33693483"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/kumawatkaran523/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10 hover:scale-110"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                        <a
                            href="mailto:kumawatkaran525@gmail.com"
                            className="text-xs sm:text-sm text-primary/60 hover:text-primary transition-colors inline-block break-all"
                        >
                            kumawatkaran525@gmail.com
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                {/* Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-gray-500 text-xs sm:text-sm flex items-center hover:text-primary transition-colors">
                        <span className="text-primary mr-2">$</span>
                        © 2025 pixelpenguin.sh
                    </p>
                    <p className="text-gray-400 text-xl sm:text-2xl lg:text-3xl font-princess hover:text-primary transition-colors cursor-default text-center">
                        deploying dreams onchain
                    </p>
                </div>
            </div>
        </footer>
    )
}
