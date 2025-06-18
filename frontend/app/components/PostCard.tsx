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
        <div className="grid grid-cols-1 gap-6 font-mplus">
            {recentPosts.map((post) => (
                <article
                    key={post.id}
                    className="relative border border-primary rounded-lg overflow-visible hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="absolute -top-2 left-4 bg-[#0B0E11] border border-primary rounded-sm px-4 text-sm text-[#9CA3AF] z-10">
                        {post.date}
                    </div>

                    <div className="px-6 py-4 pt-6">
                        <h2 className="text-2xl font-bold my-2">{post.title}</h2>
                        <span className="inline-block px-3 py-1 text-sm bg-primary text-[#060606] rounded-sm mb-1">
                            #{post.category?.toLowerCase()}
                        </span>
                    </div>

                    <div className="px-6 pb-2">
                        <p className="text-[#9CA3AF] text-xl">{post.excerpt}</p>
                    </div>

                    <div className="px-6 py-4">
                        <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center text-primary hover:text-[#96f2fc] transition-colors"
                        >
                            Read More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-1"
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
                </article>
              
              
            ))}
        </div>
    );
}