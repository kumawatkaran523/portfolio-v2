import { Terminal, Code, Cpu, Binary } from "lucide-react";
import BlogPostCard from "../components/PostCard";

export default function Blogs() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-6 py-16 font-mono">
            <div className="max-w-6xl mx-auto">
                {/* Terminal-inspired header */}
                <div className="mb-12 group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-primary group-hover:text-white transition-colors duration-500">
                                Blogs
                            </h1>
                        </div>
                    </div>

                    <p className="text-lg text-gray-400 leading-relaxed">
                         chronicles of code, chaos & creative problem-solving
                    </p>
                </div>

                <section className="mb-16">
                    <BlogPostCard />
                </section>

                
            </div>
        </div>
    )
}