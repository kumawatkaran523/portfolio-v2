'use client';
import Link from "next/link";
import { Terminal, Code2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', cmd: 'cd ~' },
    { name: 'About', path: '/about', cmd: 'cat about.txt' },
    { name: 'Projects', path: '/projects', cmd: 'ls projects/' },
    { name: 'Blogs', path: '/blogs', cmd: 'vim blogs.md' },
    { name: 'Contact', path: '/contact', cmd: 'mail -s contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5'
          : 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-3.5">
            {/* Logo with Code Icon */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group" onClick={() => setIsMenuOpen(false)}>
              <div className="relative">
                <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-mono font-bold text-white block leading-none">
                  pixel<span className="text-primary">penguin</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Command Style */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setActiveIndex(index)}
                  className="group relative"
                >
                  <div className={`px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 ${activeIndex === index
                      ? 'bg-primary/10 border border-primary/30'
                      : 'border border-transparent hover:border-gray-700'
                    }`}>
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-sm font-mono font-medium transition-colors ${activeIndex === index ? 'text-primary' : 'text-gray-300 group-hover:text-white'
                        }`}>
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-gray-600 group-hover:text-gray-500 transition-colors">
                        {item.cmd}
                      </span>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {activeIndex === index && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Status Indicator - Desktop & Tablet */}
            <div className="hidden md:flex lg:hidden items-center gap-3">
              <div className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-mono text-green-400">Online</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-mono text-green-400">Online</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center border border-gray-800 rounded-lg hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`w-5 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}></span>
                <span className={`w-5 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                <span className={`w-5 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Terminal Style */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-900 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="bg-black/50 backdrop-blur-sm p-4 sm:p-6 space-y-2 font-mono">
            <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex items-center gap-2">
              <Terminal size={14} className="text-primary flex-shrink-0" />
              <span className="truncate">$ ls -la /navigation</span>
            </div>

            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveIndex(index);
                }}
                className="block group"
              >
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${activeIndex === index
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-gray-900/30 border-gray-800 hover:border-gray-700 active:bg-gray-900/50'
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm sm:text-base font-medium mb-1 ${activeIndex === index ? 'text-primary' : 'text-white'
                        }`}>
                        {item.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate">
                        <span className="text-primary">$</span> {item.cmd}
                      </div>
                    </div>
                    <span className="text-gray-700 group-hover:text-primary group-active:translate-x-1 transition-all flex-shrink-0 ml-2">→</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Mobile Status */}
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-900">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="truncate">Status: Available for projects</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
