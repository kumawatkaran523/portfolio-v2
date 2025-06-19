import Link from "next/link";

export default function BlogPostCard() {
    const recentPosts = [
        {
            id: 1,
            date: "Day 28, 2025",
            title: "Understanding Smart Contracts in Solidity",
            excerpt: "Smart contracts are self-executing programs stored on a blockchain that automate the execution of an agreement when predetermined conditions are met...",
            category: "Blockchain"
        },
        {
            id: 2,
            date: "Day 29, 2025",
            title: "Understanding Smart Contracts in Solidity",
            excerpt: "Smart contracts are self-executing programs stored on a blockchain that automate the execution of an agreement when predetermined conditions are met...",
            category: "Blockchain"
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-8 font-mono">
            {recentPosts.map((post) => (
                <article
                    key={post.id}
                    className="relative group border border-gray-700 hover:border-primary/30 rounded-xl overflow-visible  transition-all duration-500 bg-gradient-to-b from-[#0b1111]/50 to-[#0b1111] p-[1px]"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Inner content */}
                    <div className="relative h-full bg-[#0b1111] rounded-[11px] p-5 overflow-visible">

                        {/* Date badge - now centered properly on top border */}
                        <div className="absolute top-0  left-5 transform -translate-y-1/2 bg-[#0b1111] border border-primary/50 rounded-md px-3 py-[6px] text-xs text-[#9CA3AF] z-30  ">
                            {post.date}
                        </div>

                        <div className="pt-4">
                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                {post.title}
                            </h2>
                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#01E7FF]/20 text-primary rounded-md mb-4 border border-primary/30 group-hover:bg-primary/30 group-hover:border-primary/50 transition-all duration-300">
                                #{post.category?.toLowerCase()}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className="text-[#9CA3AF] text-base leading-relaxed group-hover:text-[#d1d5db] transition-colors duration-300">
                                {post.excerpt}
                            </p>
                        </div>

                        <div className="mt-4">
                            <Link
                                href={`/blog/${post.id}`}
                                className="inline-flex items-center text-primary/80 hover:text-primary transition-colors duration-300 group/readmore"
                            >
                                <span className="mr-2 group-hover/readmore:mr-3 transition-all duration-300">Read More</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 group-hover/readmore:translate-x-1 transition-transform duration-300"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </article>
              
            ))}
        </div>
    );
}