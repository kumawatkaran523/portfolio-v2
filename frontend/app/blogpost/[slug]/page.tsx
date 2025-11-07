'use client';
import { Calendar, Clock, Tag, BookOpen, ArrowLeft, Share2, AlertCircle, Loader, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Blog {
    id: number;
    title: string;
    subTitle: string;
    slug: string;
    content: string;
    tags: string[];
    articleTree: string[];
    readTime: string;
    publishedDate: string;
}

// Code Block Component with Syntax Highlighting & Copy Button
// const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
//     const [copied, setCopied] = useState(false);
//     const match = /language-(\w+)/.exec(className || '');
//     const language = match ? match[1] : '';

//     const handleCopy = () => {
//         const code = String(children).replace(/\n$/, '');
//         navigator.clipboard.writeText(code);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };

//     if (inline) {
//         return (
//             <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-mono text-sm border border-primary/20">
//                 {children}
//             </code>
//         );
//     }
    
    

//     return (
//         <div className="relative group my-4">
//             <button
//                 onClick={handleCopy}
//                 className="absolute top-3 right-3 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
//                 title="Copy code"
//             >
//                 {copied ? (
//                     <Check size={16} className="text-green-400" />
//                 ) : (
//                     <Copy size={16} className="text-gray-400" />
//                 )}
//             </button>

//             {language ? (
//                 <div className="relative">
//                     {/* <div className="absolute top-0 left-0 px-3 py-1 bg-gray-800/90 text-gray-400 text-xs font-mono rounded-br-lg border-r border-b border-gray-700">
//                         {language}
//                     </div> */}
//                     <SyntaxHighlighter
//                         language={language}
//                         style={dracula}
//                         customStyle={{
//                             margin: 0,
//                             borderRadius: '0.5rem',
//                             padding: '2rem 1rem 1rem 1rem',
//                             fontSize: '0.875rem',
//                             border: '1px solid rgb(31, 41, 55)',
//                         }}
//                         // showLineNumbers={true}
//                         lineNumberStyle={{
//                             minWidth: '2.5em',
//                             paddingRight: '1em',
//                             color: '#6b7280',
//                             userSelect: 'none',
//                         }}
//                         {...props}
//                     >
//                         {String(children).replace(/\n$/, '')}
//                     </SyntaxHighlighter>
//                 </div>
//             ) : (
//                 <pre className="bg-gray-900/70 border border-gray-800 p-4 rounded-lg overflow-x-auto">
//                     <code className="text-gray-300 font-mono text-sm select-all">
//                         {children}
//                     </code>
//                 </pre>
//             )}
//         </div>
//     );
// };

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    const handleCopy = () => {
        const code = String(children).replace(/\n$/, '');
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isInline = inline || (!className && !String(children).includes('\n'));

    if (isInline) {
        return (
            <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-mono text-sm border border-primary/20" {...props}>
                {children}
            </code>
        );
    }
    return (
        <div className="relative group my-4">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
                title="Copy code"
            >
                {copied ? (
                    <Check size={16} className="text-green-400" />
                ) : (
                    <Copy size={16} className="text-gray-400" />
                )}
            </button>

            {language ? (
                <div className="relative">
                    <SyntaxHighlighter
                        language={language}
                        style={dracula}
                        customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            padding: '2rem 1rem 1rem 1rem',
                            fontSize: '0.875rem',
                            border: '1px solid rgb(31, 41, 55)',
                        }}
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <pre className="bg-gray-900/70 border border-gray-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-gray-300 font-mono text-sm select-all">
                        {children}
                    </code>
                </pre>
            )}
        </div>
    );
};

const markdownComponents = {
    // Headings with IDs for TOC linking
    h1: ({ node, children, ...props }: any) => {
        const text = String(children);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h1 id={id} className="text-4xl font-bold text-white mt-8 mb-4 leading-tight scroll-mt-28" {...props}>{children}</h1>;
    },
    h2: ({ node, children, ...props }: any) => {
        const text = String(children);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h2 id={id} className="text-3xl font-bold text-white mt-6 mb-3 leading-tight scroll-mt-28" {...props}>{children}</h2>;
    },
    h3: ({ node, children, ...props }: any) => {
        const text = String(children);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h3 id={id} className="text-2xl font-bold text-white mt-5 mb-2 leading-tight scroll-mt-28" {...props}>{children}</h3>;
    },
    h4: ({ node, ...props }: any) => <h4 className="text-xl font-bold text-white mt-4 mb-2 scroll-mt-28" {...props} />,
    h5: ({ node, ...props }: any) => <h5 className="text-lg font-bold text-white mt-3 mb-2 scroll-mt-28" {...props} />,
    h6: ({ node, ...props }: any) => <h6 className="font-bold text-white mt-2 mb-2 scroll-mt-28" {...props} />,

    p: ({ node, ...props }: any) => <p className="text-gray-300 mb-4 leading-relaxed whitespace-pre-wrap break-words select-text" {...props} />,
    br: ({ node, ...props }: any) => <br className="block h-3" {...props} />,

    ul: ({ node, ...props }: any) => <ul className="list-disc list-outside mb-4 ml-6 text-gray-300 space-y-2" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal list-outside mb-4 ml-6 text-gray-300 space-y-2" {...props} />,
    li: ({ node, ...props }: any) => <li className="text-gray-300 select-text" {...props} />,

    blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 text-gray-400 italic bg-gray-900/30 rounded select-text" {...props} />,

    // Enhanced code blocks with syntax highlighting
    code: CodeBlock,
    pre: ({ node, ...props }: any) => <div {...props} />,

    a: ({ node, ...props }: any) => <a className="text-primary hover:text-primary/80 underline cursor-pointer select-text" target="_blank" rel="noopener noreferrer" {...props} />,

    img: ({ node, ...props }: any) => (
        <img
            className="max-w-full h-auto rounded-lg my-4 border border-gray-800 cursor-zoom-in"
            style={{ maxWidth: '100%', height: 'auto' }}
            {...props}
            onClick={(e) => {
                const img = e.currentTarget;
                if (img.style.transform === 'scale(1.5)') {
                    img.style.transform = 'scale(1)';
                    img.style.cursor = 'zoom-in';
                } else {
                    img.style.transform = 'scale(1.5)';
                    img.style.cursor = 'zoom-out';
                }
            }}
            onError={(e: any) => {
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.border = '2px solid red';
            }}
        />
    ),

    strong: ({ node, ...props }: any) => <strong className="font-bold text-white select-text" {...props} />,
    em: ({ node, ...props }: any) => <em className="italic text-gray-200 select-text" {...props} />,
    del: ({ node, ...props }: any) => <del className="line-through text-gray-500 select-text" {...props} />,

    table: ({ node, ...props }: any) => <div className="overflow-x-auto my-4"><table className="w-full border-collapse border border-gray-800" {...props} /></div>,
    thead: ({ node, ...props }: any) => <thead className="bg-gray-900/50" {...props} />,
    tbody: ({ node, ...props }: any) => <tbody {...props} />,
    tr: ({ node, ...props }: any) => <tr className="border-b border-gray-800" {...props} />,
    td: ({ node, ...props }: any) => <td className="border border-gray-800 px-4 py-2 text-gray-300 select-text" {...props} />,
    th: ({ node, ...props }: any) => <th className="border border-gray-800 px-4 py-2 text-white font-bold bg-gray-900/70 select-text" {...props} />,
    hr: ({ node, ...props }: any) => <hr className="border-gray-800 my-8 border-t-2" {...props} />,
};

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug as string;

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shareSuccess, setShareSuccess] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`;
                console.log('Fetching from:', url);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Blog not found');
                }

                const data = await response.json();

                if (data.success && data.data) {
                    setBlog(data.data);
                } else {
                    throw new Error('Invalid response');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'Failed to load blog');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    // Share handler
    const handleShare = async () => {
        const shareData = {
            title: blog?.title || 'Check out this blog',
            text: blog?.subTitle || '',
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setShareSuccess(true);
                setTimeout(() => setShareSuccess(false), 2000);
            }
        } catch (err) {
            console.error('Share error:', err);
        }
    };

    // Smooth scroll handler
    const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
        e.preventDefault();
        const id = item.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin mx-auto mb-4 text-primary" size={32} />
                    <p className="text-gray-400">Loading blog...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <Link
                            href="/blogs"
                            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-mono"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to blogs</span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-12 font-mono">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
                        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                        <p className="text-red-400 text-lg mb-2">Blog Not Found</p>
                        <p className="text-red-300 text-sm">{error || 'The blog you are looking for does not exist.'}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>

            {/* Top Navigation Bar */}
            <div className=" border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-mono"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to blogs</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            className="relative p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-900/50 cursor-pointer"
                            title="Share this blog"
                        >
                            <Share2 size={18} />
                            {shareSuccess && (
                                <span className="absolute -bottom-8 right-0 text-xs text-green-400 whitespace-nowrap">
                                    Link copied!
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10 font-mono text-gray-300 flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="lg:w-72 flex-shrink-0">
                    <div className="lg:sticky lg:top-28 space-y-6">
                        {/* Metadata Card */}
                        <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30 space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Published</div>
                                    <div className="text-white">
                                        {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gray-800"></div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Reading time</div>
                                    <div className="text-white">{blog.readTime}</div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Tag className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-medium text-white">Topics</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary rounded text-xs hover:bg-primary/20 transition-colors cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Table of Contents */}
                        {blog.articleTree && blog.articleTree.length > 0 && (
                            <div className="border border-gray-800 rounded-lg p-5 bg-gray-900/30">
                                <div className="flex items-center gap-2 mb-4">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-medium text-white">Contents</h3>
                                </div>
                                <nav className="space-y-3 text-sm">
                                    {blog.articleTree.map((item, index) => (
                                        <a
                                            key={index}
                                            href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                            onClick={(e) => handleTOCClick(e, item)}
                                            className="flex items-start gap-2 text-gray-400 hover:text-primary transition-colors group cursor-pointer"
                                        >
                                            <span className="text-gray-600 group-hover:text-primary">{String(index + 1).padStart(2, '0')}.</span>
                                            <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <article className="flex-1 max-w-3xl">
                    {/* Article Header */}
                    <header className="mb-12 pb-8 border-b border-gray-800">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight select-text">
                            {blog.title}
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed select-text">
                            {blog.subTitle}
                        </p>
                    </header>

                    {/* Content - MARKDOWN WITH SYNTAX HIGHLIGHTING */}
                    <div className="space-y-6 select-text">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-800">
                        <div className="flex items-center justify-end">
                            <Link
                                href="/blogs"
                                className="text-primary hover:text-primary/80 transition-colors text-sm"
                            >
                                ← Back to all articles
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
