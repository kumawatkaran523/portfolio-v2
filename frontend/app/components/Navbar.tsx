import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-4 px-2 border-b-[1px] border-border">
      <div className="max-w-7xl mx-auto flex justify-between font-vt323 items-center">
        <Link href="/" className="text-4xl text-primary">pixelpenguin.sh</Link>
        <div className="hidden md:flex gap-12 text-3xl">
          {['Home', 'About', 'Project', 'Blog', 'Contact'].map(item => (
            <Link
              key={item}
              href={item.toLowerCase()}
              className="group relative text-white transition-colors duration-500 hover:text-primary"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
