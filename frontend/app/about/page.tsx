'use client';
import { Code, Cpu, Database, Server, BookOpen, Plane, Coffee, Wrench, Zap, Monitor } from "lucide-react";

// ===== DATA =====
const toolsData = [
    {
        icon: Cpu,
        title: "Blockchain",
        items: ['Solidity', 'Hardhat', 'Ethers.js', 'IPFS', 'SPL Token', 'Solana Web3.js', 'OpenZeppelin', 'Foundry']
    },
    {
        icon: Server,
        title: "Backend & APIs",
        items: ['Node.js', 'Express.js', 'REST APIs', 'Prisma ORM', 'FastAPI', 'Python']
    },
    {
        icon: Database,
        title: "Databases",
        items: ['PostgreSQL', 'MongoDB', 'SQL', 'NeonDB', 'Supabase',]
    },
    {
        icon: Wrench,
        title: "Tools & Platforms",
        items: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Railway']
    },
    {
        icon: Monitor,
        title: "Linux & OS",
        items: ['OpenSUSE Tumbleweed', 'Linux', 'GNOME', 'Wayland', 'systemd', 'DNF/Zypper']
    },
    {
        icon: Zap,
        title: "Data & ML",
        items: ['Python', 'Pandas', 'Sentence-BERT', 'spaCy', 'TensorFlow', 'Gemini API']
    },
];

// ===== INLINE COMPONENTS =====
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition-all duration-200">
        {children}
    </span>
);

const Card = ({ icon, title, children }: { icon?: React.ReactNode; title?: string; children: React.ReactNode }) => (
    <div className="border border-gray-800 rounded-lg p-5 hover:border-primary/30 transition-all duration-300 group">
        {title && (
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="font-mono text-lg text-white">{title}</h3>
            </div>
        )}
        {children}
    </div>
);

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <section className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <h2 className="font-mono text-xl font-semibold text-primary flex items-center gap-2">
                {icon}
                {title}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        </div>
        {children}
    </section>
);

// ===== MAIN COMPONENT =====
export default function About() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* HEADER */}
            <header className="mb-12 text-center">
                <h1 className="font-mono text-3xl font-bold text-primary mb-6">About Me :)</h1>
                <div className="relative inline-block">
                    <blockquote className="font-montaga text-xl text-[#FFF6ED] italic leading-relaxed relative z-10">
                        "Once I learned how to learn, I became the master of my learning."
                    </blockquote>
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                </div>
            </header>

            <div className="space-y-16 font-mono">

                {/* INTRO */}
                <section className="space-y-6">
                    <p className="text-md leading-relaxed">
                        Hey, I'm Karan — a curious builder, blockchain developer, and open-source contributor who believes in breaking things just enough to understand how they truly work.
                    </p>

                    <p className="text-md leading-relaxed">
                        My journey into tech wasn't sparked by trends or buzzwords — it began with a simple urge to figure out how systems behave when you push them past their limits. That mindset led me into blockchain — a space that feels less like a technology and more like a shift in how we define <Highlight>trust</Highlight>, <Highlight>ownership</Highlight>, and <Highlight>freedom</Highlight>.
                    </p>

                    <p className="text-md leading-relaxed">
                        What fascinates me about blockchain isn't just smart contracts or tokens — it's the ability to <Highlight>encode trust into code</Highlight>, eliminate gatekeepers, and build systems that are public yet private, transparent yet secure. It forces you to think differently — not just about how you code, but why.
                    </p>
                </section>

                {/* TOOLS */}
                <Section icon={<Code className="h-5 w-5" />} title="Tools I Work With">
                    <div className="grid md:grid-cols-2 gap-4">
                        {toolsData.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <Card
                                    key={category.title}
                                    icon={<IconComponent className="h-5 w-5 text-primary" />}
                                    title={category.title}
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((tool) => (
                                            <span
                                                key={tool}
                                                className="px-3 py-1 bg-gray-900/50 text-gray-300 text-xs rounded-md border border-gray-700 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </Section>

                {/* FOCUS */}
                <Section icon={<Coffee className="h-5 w-5" />} title="Current Focus">
                    <ul className="space-y-3 pl-5">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>
                                Building <Highlight>blockchain tools</Highlight> for better developer experience
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>
                                Making <Highlight>open-source contributions</Highlight> to smart contract infrastructure
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>
                                Exploring <Highlight>next-generation technologies</Highlight> including <span className="bg-primary/30 px-1 rounded hover:bg-primary/40 transition-all duration-200">Web3 protocols, AI/ML, and high-performance backend systems</span>
                            </span>
                        </li>

                    </ul>
                </Section>

                {/* BEYOND CODE */}
                <Section icon={<BookOpen className="h-5 w-5" />} title="Beyond Code">
                    <p className="text-md leading-relaxed">
                        <Highlight>pixelpenguin.sh</Highlight> is more than a portfolio — it's a reflection of who I am. A quiet space where I think out loud in code, document my builds and breaks, and leave behind <Highlight>pixels with purpose</Highlight>.
                    </p>

                    <p className="text-md leading-relaxed flex items-start gap-2">
                        <Plane className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                            Beyond tech, I'm someone figuring things out one project at a time. I want to <Highlight>travel more</Highlight>, meet diverse minds, and let the world shape me in ways books and screens never could.
                        </span>
                    </p>

                    <p className="text-md leading-relaxed">
                        When not coding, I find comfort in stories — particularly the raw, honest <Highlight>Hindi literature</Highlight> of writers like <Highlight>Munshi Premchand</Highlight>. His work reminds me why simplicity will always matter.
                    </p>

                    <p className="text-md leading-relaxed">
                        I know there's much left to learn and a long way to go. <Highlight>Let's see where life takes me from here.</Highlight>
                    </p>
                </Section>

            </div>
        </div>
    );
}
