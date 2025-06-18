import { Terminal } from "lucide-react";
import Link from "next/link";
import BlogPostCard from "./components/PostCard";

export default function Home() {


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20"><div className="flex justify-center mb-8">
        <img
          src="/favicon.png"
          alt="Profile"
          className="w-40 h-40 object-contain"
        />
      </div>
        <h1 className="text-5xl font-vt323 mb-4 text-primary">pixel<span className=" font-textme">penguin</span></h1>
        <h2 className="text-5xl my-2 font-libre">Karan Kumawat</h2>
        <p className="text-4xl my-6 font-mplus">Ideas in pixels, stories in code.</p>
        <div className="flex justify-center gap-4">
          <div className="flex gap-4">
            <span className="px-4 py-2 text-[#9CA3AF] font-mplus text-xl flex items-center gap-2">
              <Terminal color="#9CA3AF" size={20} className="border rounded-[2px]" />
              Blockchain Developer
            </span>
            <span className="px-4 py-2 text-[#9CA3AF] font-mplus text-xl flex items-center gap-2">
              <Terminal color="#9CA3AF" size={20} className=" border rounded-[2px]" />
              Open Source Contributor
            </span>
          </div>
        </div>
      </section>
      <section className="my-2">
        <h3 className="text-3xl font-bold mb-8 font-mplus"><Terminal color="#00e7ff" size={24} strokeWidth={3} className="border rounded-[2px] text-primary inline-block" /> Recent Post</h3>
        <BlogPostCard />
      </section>
    </div>
  );
}
