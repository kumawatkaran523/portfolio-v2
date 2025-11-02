'use client';
import { GitCommit, Terminal, Code2, Zap, Box } from "lucide-react";
import Link from "next/link";
import BlogPostCard from "./components/PostCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "$ whoami";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <>
      {/* Scanline effect */}
      <div className="scanline" />

      <div className="max-w-7xl mx-auto px-4 py-8 grid-background relative">
        {/* Terminal-style Hero */}
        <section className="py-20 relative">
          {/* Terminal Window */}
          <div className="max-w-4xl mx-auto">
            {/* Terminal Header */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-t-lg px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-500 text-sm ml-4">karankumawat@portfolio:~</span>
            </div>

            {/* Terminal Content */}
            <div className="bg-black/80 backdrop-blur-sm border-x border-b border-gray-800 rounded-b-lg p-8 font-mono text-sm">
              <div className="mb-4">
                <span className="text-green-400">guest@pixelpenguin</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-500">$ </span>
                <span className="text-white">{text}</span>
                {showCursor && <span className="text-primary">▊</span>}
              </div>

              <div className="space-y-2 text-gray-300 mt-6">
                <div className="flex items-center gap-2">
                  <Code2 size={16} className="text-primary" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Name:</span>
                  <span className="text-primary">Karan Kumawat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-primary" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Role:</span>
                  <span className="text-primary">Full-Stack Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-primary" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Specialty:</span>
                  <span className="text-primary">Blockchain & Web3</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box size={16} className="text-primary" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Status:</span>
                  <span className="text-green-400">Available for opportunities</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-800">
                <p className="text-gray-400 mb-4">
                  <span className="text-gray-500">// </span>
                  Ideas in pixels, stories in code.
                </p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-primary/10 border border-primary/50 text-primary rounded hover:bg-primary/20 transition-all duration-300 flex items-center gap-2">
                    <Terminal size={16} />
                    <span>./view-projects.sh</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-2">
                    <GitCommit size={16} />
                    <span>git --contributions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Profile Image */}
          <div className="absolute top-8 right-8 hidden lg:block">
            <div className="relative float">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <img
                src="/favicon.png"
                alt="Profile"
                className="w-32 h-32 object-contain relative z-10 card-3d"
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="mb-16 overflow-hidden border-y border-gray-800 bg-gray-900/20 backdrop-blur-sm py-4">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Solidity', 'Web3', 'Prisma', 'Python', 'Solidity', 'Web3', 'Prisma', 'Python', 'Solidity', 'Web3', 'Prisma', 'Python'].map((tech, i) => (
              <span key={i} className="text-gray-500 font-mono flex items-center gap-2">
                <Terminal size={16} className="text-primary" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Recent Posts with Terminal Style */}
        <section className="my-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-green-400 font-mono">$</span>
            <Terminal color="#00e7ff" size={24} className="text-primary" />
            <h2 className="text-3xl font-mono text-primary">cat recent_posts.log</h2>
            <div className="h-[1px] bg-gradient-to-r from-primary/50 to-transparent flex-1"></div>
          </div>

          <BlogPostCard />
        </section>

        {/* Command Line CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg px-6 py-4 font-mono">
            <span className="text-gray-500">$ </span>
            <Link
              href="/blogs"
              className="text-primary hover:underline transition-all group"
            >
              ls -la /blogs
            </Link>
            <span className="text-gray-500 ml-2"># View all articles</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </>
  );
}
