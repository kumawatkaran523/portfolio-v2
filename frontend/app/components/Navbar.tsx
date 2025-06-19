import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Navbar() {
  const navItems = ['Home', 'About', 'Projects', 'Blogs', 'Contact'];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md py-3 px-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Terminal className="h-5 w-5 text-primary group-hover:text-cyan-300 transition-colors" />
          <span className="text-xl font-mono font-bold text-primary group-hover:text-white transition-colors">
            pixelpenguin<span className="text-cyan-300">.sh</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="relative py-1 px-1 group"
            >
              <span className="text-gray-300 group-hover:text-white font-mono text-lg font-medium tracking-wider transition-colors">
                {item}
              </span>
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-gradient-to-r from-primary to-cyan-300 transform -translate-x-1/2 transition-all duration-300 group-hover:w-[90%]" />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button (placeholder) */}
        <button className="md:hidden text-gray-300 hover:text-primary transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}