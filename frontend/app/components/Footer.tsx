import Link from "next/link";
import { ExternalLink, Github, Linkedin,Terminal,Twitter } from 'lucide-react';
export default function Footer() {
    return (
        <footer className="py-12 px-4 bg-bottom font-mplus">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-40">
                    {/* Profile Section */}
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="flex-shrink-0">
                            <img
                                src="/favicon.png"
                                alt="pixelPenguin"
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h5 className="text-xl mb-2">Karan Kumawat</h5>
                            <p className="text-gray-500 text-xl">Blockchain Developer • Open-Source Contributor • GSoC'25</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-40">
                        <div>
                            <h5 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                Site Links
                                <ExternalLink size={20} className="inline-block" />
                            </h5>
                            <div className="grid grid-cols-2 gap-8 md:gap-40">
                                <ul className="space-y-3">
                                    {['Home', 'Blog', 'Projects'].map(link => (
                                        <li key={link}>
                                            <Link
                                                href="#"
                                                className="text-xl text-gray-500 hover:text-primary transition-colors duration-300"
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-3">
                                    {['About Me', 'Contact'].map(link => (
                                        <li key={link}>
                                            <Link
                                                href="#"
                                                className="text-xl text-gray-500 hover:text-primary transition-colors duration-300"
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                    <Terminal color="#ffffff" strokeWidth={1.75} /> <p className="text-xl">Lets Connect</p>
                    </div>
                    <div className="flex gap-2 my-3">
                        <Linkedin color="#9CA3AF" strokeWidth={1.75} size={28} />
                        <Twitter color="#9CA3AF" strokeWidth={1.75} size={28} />
                        <Github color="#9CA3AF" strokeWidth={1.75} size={28} />
                    </div>
                </div>
                {/* Copyright Section */}
                <div className=" ">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="flex items-center ">
                            <span className="text-4xl mr-1 relative top-1">©</span>
                            <span className="text-xl">2025 pixelpenguin.sh</span>
                        </p>
                        <p className="text-4xl font-princess text-[#9CA3AF]">
                            deploying dreams on chain
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}