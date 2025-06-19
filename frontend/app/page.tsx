import { GitCommit, Terminal } from "lucide-react";
import Link from "next/link";
import BlogPostCard from "./components/PostCard";

export default function Home() {


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="text-center py-20"><div className="flex justify-center mb-8">
        <img
          src="/favicon.png"
          alt="Profile"
          className="w-40 h-40 object-contain"
        />
      </div>
        <h1 className="text-5xl font-vt323 mb-4 text-primary">pixel<span className=" font-textme">penguin</span></h1>
        <h2 className="text-5xl my-2 font-libre">Karan Kumawat</h2>
        <p className="text-3xl my-6 font-mono">Ideas in pixels, stories in code.</p>
        <div className="flex justify-center gap-4">
          <div className="flex gap-4">
            <span className="px-4 py-2 text-[#9CA3AF] font-mono text-lg flex items-center gap-2">
              <Terminal color="#9CA3AF" size={20} className="border rounded-[2px]" />
              Blockchain Developer
            </span>
            <span className="px-4 py-2 text-[#9CA3AF] font-mono text-lg flex items-center gap-2">
              <Terminal color="#9CA3AF" size={20} className=" border rounded-[2px]" />
              Open Source Contributor
            </span>
          </div>
        </div>
      </section>
      <section className="my-2">
        <div className="flex items-center gap-3 mb-16">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-primary/50 w-16"></div>
          <Terminal color="#00e7ff" size={24} strokeWidth={3} className="border rounded-[2px] text-primary inline-block" /> 
          <h2 className="text-3xl font-medium font-mono text-primary">Recent Posts</h2>
          <div className="h-[1px] bg-gradient-to-r from-primary/50 to-transparent flex-1"></div>
        </div>
        <BlogPostCard />
      </section>
      <div className="mt-12 text-center">
        <Link href="/blogs" className="inline-flex items-center text-primary/80 hover:text-primary transition-colors group">
          <span className="mr-2 group-hover:mr-3 transition-all">View All Articles</span>
          <GitCommit className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
