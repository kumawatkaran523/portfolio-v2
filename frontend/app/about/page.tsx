'use client'; // Client Component directive

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="font-mplus text-2xl font-bold text-primary mb-6">About</h1>
            <section className="mb-10 text-center">
                <blockquote className="font-montaga text-2xl text-[#FFF6ED] italic leading-relaxed">
                    "Once I learned how to learn, I became the master of my learning."
                </blockquote>
            </section>

            <div className="space-y-16 font-mplus">
                <section className="space-y-6">
                    <p className="text-lg leading-relaxed">
                        Hey, I'm <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">Karan</span> — a curious builder, <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">blockchain developer</span>, and <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">open-source contributor</span> who believes in breaking things just enough to understand how they truly work.
                    </p>

                    <p className="text-lg leading-relaxed">
                        My journey into tech wasn't sparked by trends or buzzwords — it began with a simple urge to figure out how systems behave when you push them past their limits. That mindset led me into <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">blockchain</span> — a space that feels less like a technology and more like a shift in how we define <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">trust</span>, <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">ownership</span>, and <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">freedom</span>.
                    </p>

                    <p className="text-lg leading-relaxed">
                        What fascinates me about blockchain isn't just smart contracts or tokens — it's the ability to <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">encode trust into code</span>, eliminate gatekeepers, and build systems that are public yet private, transparent yet secure. It forces you to think differently — not just about how you code, but why.
                    </p>

                    <p className="text-lg leading-relaxed">
                        I build tools that <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">simplify complexity</span> — from decentralized applications to privacy-first protocols. I write code that's clean and scalable, and words that explain, document, and inspire. <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">Open source</span> and blogging are my ways to contribute back to the ecosystem that taught me so much.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="font-mplus text-xl font-semibold text-primary">What I'm working on</h2>
                    <ul className="space-y-3 list-disc list-inside text-lg pl-5">
                        <li><span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">Blockchain tools</span> for better developer experience</li>
                        <li><span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">Open-source contributions</span> to smart contract infrastructure</li>
                        <li>Writing about my journey and discoveries</li>
                        <li>Building a <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">decentralized invoicing platform</span> with privacy-preserving features for <span className="bg-primary/30 px-1 rounded hover:bg-primary/40 transition">Google Summer of Code 2025 with AOSSIE</span></li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="font-mplus text-xl font-semibold text-primary">Beyond</h2>
                    <p className="text-lg leading-relaxed">
                        <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">pixelpenguin.sh</span> is more than a portfolio — it's a reflection of who I am. A quiet space where I think out loud in code, document my builds and breaks, and leave behind <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">pixels with purpose</span>.
                    </p>

                    <p className="text-lg leading-relaxed">
                        Beyond tech, I'm someone figuring things out one project at a time. I want to <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">travel more</span>, meet diverse minds, and let the world shape me in ways books and screens never could.
                    </p>

                    <p className="text-lg leading-relaxed">
                        When not coding, I find comfort in stories — particularly the raw, honest <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">Hindi literature</span> of writers like <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">Munshi Premchand</span>. His work reminds me why simplicity will always matter.
                    </p>

                    <p className="text-lg leading-relaxed">
                        I know there's much left to learn and a long way to go. <span className="bg-primary/20 px-1 rounded hover:bg-primary/30 transition">Let's see where life takes me from here.</span>
                    </p>
                </section>
            </div>
        </div>
    )
}