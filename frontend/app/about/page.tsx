'use client';
import { Code, Cpu, Database, Server, BookOpen, Plane, Coffee, Wrench } from "lucide-react";

export default function About() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Header Section */}
            <header className="mb-12 text-center">
                <h1 className="font-mono text-3xl font-bold text-primary mb-6">About</h1>
                <div className="relative inline-block">
                    <blockquote className="font-montaga text-xl text-[#FFF6ED] italic leading-relaxed relative z-10">
                        "Once I learned how to learn, I became the master of my learning."
                    </blockquote>
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                </div>
            </header>

            {/* Main Content */}
            <div className="space-y-16 font-mono">
                {/* Introduction Section */}
                <section className="space-y-6">
                    <p className="text-md leading-relaxed">
                        Hey, I'm Karan — a curious builder, <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">blockchain developer</span>, and <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">open-source contributor</span> who believes in breaking things just enough to understand how they truly work.
                    </p>

                    <p className="text-md leading-relaxed">
                        My journey into tech wasn't sparked by trends or buzzwords — it began with a simple urge to figure out how systems behave when you push them past their limits. That mindset led me into blockchain — a space that feels less like a technology and more like a shift in how we define <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">trust</span>, <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">ownership</span>, and <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">freedom</span>.
                    </p>

                    <p className="text-md leading-relaxed">
                        What fascinates me about blockchain isn't just smart contracts or tokens — it's the ability to <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">encode trust into code</span>, eliminate gatekeepers, and build systems that are public yet private, transparent yet secure. It forces you to think differently — not just about how you code, but why.
                    </p>
                </section>

                {/* Tools Section */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                        <h2 className="font-mono text-xl font-semibold text-primary flex items-center gap-2">
                            <Code className="h-5 w-5" />
                            Tools I Work With
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { icon: <Cpu className="h-5 w-5 text-primary" />, title: "Blockchain", items: ['Solidity', 'Hardhat', 'Ethers.js', 'IPFS', 'SPL Token', 'Solana Web3.js'] },
                            { icon: <Server className="h-5 w-5 text-primary" />, title: "Backend & APIs", items: ['Node.js', 'Express.js', 'REST APIs', 'Prisma ORM'] },
                            { icon: <Database className="h-5 w-5 text-primary" />, title: "Databases", items: ['PostgreSQL', 'MongoDB'] },
                            { icon: <Wrench className="h-5 w-5 text-primary" />, title: "Tools & Platforms", items: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Railway'] }
                        ].map((category, index) => (
                            <div
                                key={index}
                                className="border border-gray-800 rounded-lg p-5 hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    {category.icon}
                                    <h3 className="font-mono text-lg text-white">{category.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map(tool => (
                                        <span
                                            key={tool}
                                            className="px-3 py-1 bg-gray-900/50 text-gray-300 text-xs rounded-md border border-gray-700 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Current Work Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                        <h2 className="font-mono text-xl font-semibold text-primary flex items-center gap-2">
                            <Coffee className="h-5 w-5" />
                            Current Focus
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                    </div>
                    <ul className="space-y-3 pl-5">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Building <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">blockchain tools</span> for better developer experience</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Making <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">open-source contributions</span> to smart contract infrastructure</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Developing a <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">decentralized invoicing platform</span> for <span className="bg-primary/30 px-1 rounded hover:bg-primary/40 transition-all duration-200">Google Summer of Code 2025</span></span>
                        </li>
                    </ul>
                </section>

                {/* Beyond Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                        <h2 className="font-mono text-xl font-semibold text-primary flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Beyond Code
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                    </div>

                    <p className="text-md leading-relaxed">
                        <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">pixelpenguin.sh</span> is more than a portfolio — it's a reflection of who I am. A quiet space where I think out loud in code, document my builds and breaks, and leave behind <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">pixels with purpose</span>.
                    </p>

                    <p className="text-md leading-relaxed flex items-start gap-2">
                        <Plane className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Beyond tech, I'm someone figuring things out one project at a time. I want to <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">travel more</span>, meet diverse minds, and let the world shape me in ways books and screens never could.</span>
                    </p>

                    <p className="text-md leading-relaxed">
                        When not coding, I find comfort in stories — particularly the raw, honest <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">Hindi literature</span> of writers like <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">Munshi Premchand</span>. His work reminds me why simplicity will always matter.
                    </p>

                    <p className="text-md leading-relaxed">
                        I know there's much left to learn and a long way to go. <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">Let's see where life takes me from here.</span>
                    </p>
                </section>
            </div>
        </div>
    )
}