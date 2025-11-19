'use client';
import { Calendar, Clock, Tag, BookOpen, ArrowLeft, Share2, AlertCircle, Loader, Copy, Check, Menu, X } from "lucide-react";
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
            <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-mono text-xs sm:text-sm border border-primary/20" {...props}>
                {children}
            </code>
        );
    }
    return (
        <div className="relative group my-4 -mx-4 sm:mx-0">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
                title="Copy code"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check size={14} className="text-green-400 sm:w-4 sm:h-4" />
                ) : (
                    <Copy size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                )}
            </button>

            {language ? (
                <div className="relative overflow-x-auto">
                    <SyntaxHighlighter
                        language={language}
                        style={dracula}
                        customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            padding: '2rem 0.75rem 1rem 0.75rem',
                            fontSize: '0.75rem',
                            border: '1px solid rgb(31, 41, 55)',
                        }}
                        codeTagProps={{
                            style: {
                                fontSize: '0.75rem',
                                lineHeight: '1.5',
                            }
                        }}
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <pre className="bg-gray-900/70 border border-gray-800 p-3 sm:p-4 rounded-lg overflow-x-auto">
                    <code className="text-gray-300 font-mono text-xs sm:text-sm select-all">
                        {children}
                    </code>
                </pre>
            )}
        </div>
    );
};

const markdownComponents = {
    h1: ({ node, children, ...props }: any) => {
        const text = String(children);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h1 id={id} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-8 mb-4 leading-tight scroll-mt-20 sm:scroll-mt-28" {...props}>{children}</h1>;
    },
    h2: ({ node, children, ...props }: any) => {
        const text = String(children);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h2 id={id} className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-6 mb-3 leading-tight scroll-mt-20 sm:scroll-mt-28" {...props}>{children}</h2>;
    },
    h3: ({ node, children, ...props }: any) => {
        const text = String(children);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return <h3 id={id} className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-5 mb-2 leading-tight scroll-mt-20 sm:scroll-mt-28" {...props}>{children}</h3>;
    },
    h4: ({ node, ...props }: any) => <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white mt-4 mb-2 scroll-mt-20 sm:scroll-mt-28" {...props} />,
    h5: ({ node, ...props }: any) => <h5 className="text-sm sm:text-base lg:text-lg font-bold text-white mt-3 mb-2 scroll-mt-20 sm:scroll-mt-28" {...props} />,
    h6: ({ node, ...props }: any) => <h6 className="text-sm sm:text-base font-bold text-white mt-2 mb-2 scroll-mt-20 sm:scroll-mt-28" {...props} />,

    p: ({ node, ...props }: any) => <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed whitespace-pre-wrap break-words select-text" {...props} />,
    br: ({ node, ...props }: any) => <br className="block h-2 sm:h-3" {...props} />,

    ul: ({ node, ...props }: any) => <ul className="list-disc list-outside mb-4 ml-5 sm:ml-6 text-gray-300 space-y-2 text-sm sm:text-base" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal list-outside mb-4 ml-5 sm:ml-6 text-gray-300 space-y-2 text-sm sm:text-base" {...props} />,
    li: ({ node, ...props }: any) => <li className="text-gray-300 select-text pl-1" {...props} />,

    blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-primary pl-3 sm:pl-4 py-2 my-4 text-sm sm:text-base text-gray-400 italic bg-gray-900/30 rounded select-text" {...props} />,

    code: CodeBlock,
    pre: ({ node, ...props }: any) => <div {...props} />,

    a: ({ node, ...props }: any) => <a className="text-primary hover:text-primary/80 underline cursor-pointer select-text break-words" target="_blank" rel="noopener noreferrer" {...props} />,

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

    table: ({ node, ...props }: any) => <div className="overflow-x-auto my-4 -mx-4 sm:mx-0"><table className="w-full min-w-[600px] border-collapse border border-gray-800" {...props} /></div>,
    thead: ({ node, ...props }: any) => <thead className="bg-gray-900/50" {...props} />,
    tbody: ({ node, ...props }: any) => <tbody {...props} />,
    tr: ({ node, ...props }: any) => <tr className="border-b border-gray-800" {...props} />,
    td: ({ node, ...props }: any) => <td className="border border-gray-800 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 select-text" {...props} />,
    th: ({ node, ...props }: any) => <th className="border border-gray-800 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white font-bold bg-gray-900/70 select-text" {...props} />,
    hr: ({ node, ...props }: any) => <hr className="border-gray-800 my-6 sm:my-8 border-t-2" {...props} />,
};

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug as string;

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shareSuccess, setShareSuccess] = useState(false);
    const [showTOC, setShowTOC] = useState(false);

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

    // Close TOC when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (showTOC && !target.closest('.toc-sidebar') && !target.closest('.toc-button')) {
                setShowTOC(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showTOC]);

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

    const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
        e.preventDefault();
        const id = item.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setShowTOC(false); // Close mobile TOC after clicking
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin mx-auto mb-4 text-primary" size={32} />
                    <p className="text-gray-400 text-sm sm:text-base">Loading blog...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                        <Link
                            href="/blogs"
                            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-xs sm:text-sm font-mono"
                        >
                            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                            <span>Back to blogs</span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 font-mono">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 sm:p-8 text-center">
                        <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-400 mx-auto mb-4" />
                        <p className="text-red-400 text-base sm:text-lg mb-2">Blog Not Found</p>
                        <p className="text-red-300 text-xs sm:text-sm">{error || 'The blog you are looking for does not exist.'}</p>
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
            <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-primary transition-colors text-xs sm:text-sm font-mono"
                    >
                        <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Back to blogs</span>
                        <span className="xs:hidden">Back</span>
                    </Link>
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Mobile TOC Button */}
                        {blog.articleTree && blog.articleTree.length > 0 && (
                            <button
                                onClick={() => setShowTOC(!showTOC)}
                                className="toc-button lg:hidden p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-900/50"
                                aria-label="Toggle table of contents"
                            >
                                {showTOC ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        )}
                        <button
                            onClick={handleShare}
                            className="relative p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-900/50 cursor-pointer"
                            title="Share this blog"
                            aria-label="Share"
                        >
                            <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                            {shareSuccess && (
                                <span className="absolute -bottom-8 right-0 text-[10px] sm:text-xs text-green-400 whitespace-nowrap bg-gray-900 px-2 py-1 rounded">
                                    Link copied!
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10 font-mono text-gray-300 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                    <div className="lg:sticky lg:top-24 space-y-6">
                        {/* Metadata Card */}
                        <div className="border border-gray-800 rounded-lg p-4 sm:p-5 bg-gray-900/30 space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Published</div>
                                    <div className="text-white text-sm">
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
                                    <div className="text-white text-sm">{blog.readTime}</div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="border border-gray-800 rounded-lg p-4 sm:p-5 bg-gray-900/30">
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
                            <div className="border border-gray-800 rounded-lg p-4 sm:p-5 bg-gray-900/30">
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
                                            <span className="text-gray-600 group-hover:text-primary flex-shrink-0">{String(index + 1).padStart(2, '0')}.</span>
                                            <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Mobile TOC Sidebar */}
                {showTOC && blog.articleTree && blog.articleTree.length > 0 && (
                    <>
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setShowTOC(false)} />
                        <aside className="toc-sidebar fixed top-0 right-0 h-full w-72 bg-[#0a0a0a] border-l border-gray-800 z-50 lg:hidden overflow-y-auto">
                            <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white font-bold">Contents</h3>
                                    <button onClick={() => setShowTOC(false)} className="text-gray-400 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>
                                <nav className="space-y-3 text-sm">
                                    {blog.articleTree.map((item, index) => (
                                        <a
                                            key={index}
                                            href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                            onClick={(e) => handleTOCClick(e, item)}
                                            className="flex items-start gap-2 text-gray-400 hover:text-primary transition-colors group cursor-pointer"
                                        >
                                            <span className="text-gray-600 group-hover:text-primary flex-shrink-0">{String(index + 1).padStart(2, '0')}.</span>
                                            <span>{item}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>
                    </>
                )}

                {/* Main Content */}
                <article className="flex-1 max-w-3xl">
                    {/* Mobile Metadata */}
                    <div className="lg:hidden mb-6 pb-4 border-b border-gray-800 flex flex-wrap gap-3 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            <span>
                                {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <span className="text-gray-700">•</span>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            <span>{blog.readTime}</span>
                        </div>
                    </div>

                    {/* Article Header */}
                    <header className="mb-8 sm:mb-10 lg:mb-12 pb-6 sm:pb-8 border-b border-gray-800">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight select-text">
                            {blog.title}
                        </h1>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed select-text">
                            {blog.subTitle}
                        </p>
                    </header>

                    {/* Mobile Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="lg:hidden mb-6 flex flex-wrap gap-2">
                            {blog.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary rounded text-xs"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Content - MARKDOWN */}
                    <div className="space-y-4 sm:space-y-6 select-text">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/blogs"
                                className="text-primary hover:text-primary/80 transition-colors text-xs sm:text-sm flex items-center gap-1.5"
                            >
                                <ArrowLeft size={14} />
                                <span>Back to all articles</span>
                            </Link>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors text-xs sm:text-sm"
                            >
                                <Share2 size={14} />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
