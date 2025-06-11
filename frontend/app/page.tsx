import Link from "next/link";

export default function Home() {
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">pixelpenguin</h1>
        <h2 className="text-3xl mb-2">Karan Kumawat</h2>
        <p className="text-xl mb-6">Ideas in pixels, stories in code.</p>
        <div className="flex justify-center gap-4">
          <span className="px-4 py-2 bg-gray-100 rounded-full">Blockchain Developer</span>
          <span className="px-4 py-2 bg-gray-100 rounded-full">Open Source Contributor</span>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="my-16">
        <h3 className="text-2xl font-semibold mb-8">Recent Post</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {recentPosts.map(post => (
            <div key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <span className="text-sm text-gray-500">{post.date}</span>
              <h4 className="text-xl font-bold my-2">{post.title}</h4>
              <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-3">
                {post.category}
              </span>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href="#" className="text-blue-600 hover:underline">Read More →</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
