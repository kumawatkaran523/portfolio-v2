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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 grid-background relative">
        {/* Terminal-style Hero */}
        <section className="py-8 sm:py-12 lg:py-20 relative">
          {/* Terminal Window */}
          <div className="max-w-4xl mx-auto">
            {/* Terminal Header */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-t-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-500 text-xs sm:text-sm ml-2 sm:ml-4 truncate">karankumawat@portfolio:~</span>
            </div>

            {/* Terminal Content */}
            <div className="bg-black/80 backdrop-blur-sm border-x border-b border-gray-800 rounded-b-lg p-4 sm:p-6 lg:p-8 font-mono text-xs sm:text-sm">
              <div className="mb-4 overflow-x-auto">
                <div className="min-w-max">
                  <span className="text-green-400">guest@pixelpenguin</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-500">$ </span>
                  <span className="text-white">{text}</span>
                  {showCursor && <span className="text-primary">▊</span>}
                </div>
              </div>

              <div className="space-y-2 text-gray-300 mt-4 sm:mt-6">
                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                  <Code2 size={16} className="text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Name:</span>
                  <span className="text-primary break-all">Karan Kumawat</span>
                </div>
                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                  <Terminal size={16} className="text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Role:</span>
                  <span className="text-primary break-all">Full-Stack Developer</span>
                </div>
                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                  <Zap size={16} className="text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Specialty:</span>
                  <span className="text-primary break-all">Blockchain & Web3</span>
                </div>
                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                  <Box size={16} className="text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Status:</span>
                  <span className="text-green-400 break-all">Available for opportunities</span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-800">
                <p className="text-gray-400 mb-4 text-xs sm:text-sm">
                  <span className="text-gray-500">// </span>
                  Ideas in pixels, stories in code.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="px-3 sm:px-4 py-2 bg-primary/10 border border-primary/50 text-primary rounded hover:bg-primary/20 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm w-full sm:w-auto">
                    <Terminal size={14} className="sm:w-4 sm:h-4" />
                    <span className="truncate">./view-projects.sh</span>
                  </button>
                  <button className="px-3 sm:px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm w-full sm:w-auto">
                    <GitCommit size={14} className="sm:w-4 sm:h-4" />
                    <span className="truncate">git --contributions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Profile Image - Hidden on mobile and tablet */}
          <div className="absolute top-8 right-8 hidden xl:block">
            <div className="relative float">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <img
                src="/favicon.png"
                alt="Profile"
                className="w-32 h-32 object-contain relative z-10 card-3d"
              />
            </div>
            <div className="font-mono leading-tight text-primary">
            </div>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="mb-12 sm:mb-16 overflow-hidden border-y border-gray-800 bg-gray-900/20 backdrop-blur-sm py-3 sm:py-4">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 animate-marquee whitespace-nowrap text-xs sm:text-sm">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Solidity', 'Web3', 'Prisma', 'Python', 'Solidity', 'Web3', 'Prisma', 'Python', 'Solidity', 'Web3', 'Prisma', 'Python'].map((tech, i) => (
              <span key={i} className="text-gray-500 font-mono flex items-center gap-2">
                <Terminal size={14} className="text-primary sm:w-4 sm:h-4" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Recent Posts with Terminal Style */}
        <section className="my-12 sm:my-16">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto">
            <span className="text-green-400 font-mono flex-shrink-0">$</span>
            <Terminal color="#00e7ff" size={20} className="text-primary flex-shrink-0 sm:w-6 sm:h-6" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-mono text-primary whitespace-nowrap">cat recent_posts.log</h2>
            <div className="h-[1px] bg-gradient-to-r from-primary/50 to-transparent flex-1 min-w-[20px]"></div>
          </div>

          <BlogPostCard />
        </section>

        {/* Command Line CTA */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="inline-block bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg px-4 sm:px-6 py-3 sm:py-4 font-mono text-xs sm:text-sm max-w-full overflow-x-auto">
            <span className="text-gray-500">$ </span>
            <Link
              href="/blogs"
              className="text-primary hover:underline transition-all group"
            >
              ls -la /blogs
            </Link>
            <span className="text-gray-500 ml-2 hidden sm:inline"># View all articles</span>
            <span className="text-gray-500 ml-2 sm:hidden block mt-1"># View all</span>
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
          animation: marquee 30s linear infinite;
        }
        
        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        }
      `}</style>
    </>
  );
}
