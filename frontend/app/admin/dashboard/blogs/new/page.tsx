'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader, Eye, Code } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = {
    h1: ({ node, ...props }: any) => <h1 className="text-4xl font-bold text-white mt-8 mb-4 leading-tight" {...props} />,
    h2: ({ node, ...props }: any) => <h2 className="text-3xl font-bold text-white mt-6 mb-3 leading-tight" {...props} />,
    h3: ({ node, ...props }: any) => <h3 className="text-2xl font-bold text-white mt-5 mb-2 leading-tight" {...props} />,
    h4: ({ node, ...props }: any) => <h4 className="text-xl font-bold text-white mt-4 mb-2" {...props} />,
    h5: ({ node, ...props }: any) => <h5 className="text-lg font-bold text-white mt-3 mb-2" {...props} />,
    h6: ({ node, ...props }: any) => <h6 className="font-bold text-white mt-2 mb-2" {...props} />,
    p: ({ node, ...props }: any) => {
        const children = props.children;
        return (
            <p className="text-gray-300 mb-4 leading-relaxed break-words">
                {Array.isArray(children) ? children : [children]}
            </p>
        );
    },
    br: ({ node, ...props }: any) => <br className="block h-3" />,
    text: ({ node, ...props }: any) => {
        const text = props.children || '';
        return (
            <span className="whitespace-pre-wrap">
                {text}
            </span>
        );
    },
    ul: ({ node, ...props }: any) => <ul className="list-disc list-inside mb-4 ml-4 text-gray-300 space-y-2" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal list-inside mb-4 ml-4 text-gray-300 space-y-2" {...props} />,
    li: ({ node, ...props }: any) => <li className="text-gray-300" {...props} />,
    blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 text-gray-400 italic bg-gray-900/30 rounded" {...props} />,
    code: ({ node, inline, ...props }: any) =>
        inline ?
            <code className="bg-gray-900/50 px-2 py-1 rounded text-yellow-400 font-mono text-sm" {...props} /> :
            <code className="bg-gray-900/50 p-4 rounded-lg text-gray-300 font-mono text-sm block overflow-x-auto my-4" {...props} />,
    pre: ({ node, ...props }: any) => <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
    a: ({ node, ...props }: any) => <a className="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer" {...props} />,
    img: ({ node, ...props }: any) => (
        <img
            className="max-w-full h-auto rounded-lg my-4 border border-gray-800"
            style={{ maxWidth: '100%', height: 'auto' }}
            {...props}
            onError={(e: any) => {
                e.currentTarget.style.display = 'none';
            }}
        />
    ),
    strong: ({ node, ...props }: any) => <strong className="font-bold text-white" {...props} />,
    em: ({ node, ...props }: any) => <em className="italic text-gray-200" {...props} />,
    del: ({ node, ...props }: any) => <del className="line-through text-gray-500" {...props} />,
    table: ({ node, ...props }: any) => <table className="w-full border-collapse my-4 border border-gray-800" {...props} />,
    thead: ({ node, ...props }: any) => <thead className="bg-gray-900/50" {...props} />,
    tbody: ({ node, ...props }: any) => <tbody {...props} />,
    tr: ({ node, ...props }: any) => <tr className="border-b border-gray-800" {...props} />,
    td: ({ node, ...props }: any) => <td className="border border-gray-800 px-4 py-2 text-gray-300" {...props} />,
    th: ({ node, ...props }: any) => <th className="border border-gray-800 px-4 py-2 text-white font-bold bg-gray-900/70" {...props} />,
    hr: ({ node, ...props }: any) => <hr className="border-gray-800 my-6" {...props} />,
};

export default function NewBlog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subTitle: '',
        slug: '',
        thumbnail: '',
        content: '',
        tags: '',
        articleTree: '',
        readTime: '5 min',
        publishedDate: new Date().toISOString().split('T')[0],
        featured: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('authToken');

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                articleTree: formData.articleTree.split(',').map(t => t.trim()).filter(Boolean),
                publishedDate: new Date(formData.publishedDate).toISOString(),
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/createBlog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Blog created successfully!');
                router.push('/admin/dashboard/blogs');
            } else {
                alert(data.message || 'Failed to create blog');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/dashboard/blogs"
                    className="p-2 hover:bg-gray-900/50 rounded transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Blog</h1>
                    <p className="text-gray-500">Markdown supported - toggle Preview to see</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="Blog title"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Slug *</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="blog-url-slug"
                        />
                        <p className="text-xs text-gray-600 mt-1">Auto-generated from title</p>
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Subtitle *</label>
                        <input
                            type="text"
                            name="subTitle"
                            value={formData.subTitle}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="Short description"
                        />
                    </div>

                    {/* Thumbnail URL */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Thumbnail URL</label>
                        <input
                            type="url"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Content with Preview */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm text-gray-400">Content (Markdown) *</label>
                            <button
                                type="button"
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center gap-2 text-xs px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded hover:bg-primary/20 transition-all"
                            >
                                {showPreview ? (
                                    <>
                                        <Code size={14} />
                                        Edit
                                    </>
                                ) : (
                                    <>
                                        <Eye size={14} />
                                        Preview
                                    </>
                                )}
                            </button>
                        </div>

                        {showPreview ? (
                            <div className="w-full bg-black/50 border border-gray-800 rounded-lg px-6 py-4 overflow-y-auto min-h-96 max-h-96">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={markdownComponents}
                                >
                                    {formData.content}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={20}
                                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono text-sm resize-none"
                                placeholder="Write in Markdown..."
                            ></textarea>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="blockchain, web3, solidity"
                        />
                    </div>

                    {/* Article Tree */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Article Tree / TOC</label>
                        <input
                            type="text"
                            name="articleTree"
                            value={formData.articleTree}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            placeholder="Introduction, Main Topic, Conclusion"
                        />
                    </div>

                    {/* Read Time & Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Read Time</label>
                            <input
                                type="text"
                                name="readTime"
                                value={formData.readTime}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                                placeholder="5 min"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Publish Date</label>
                            <input
                                type="date"
                                name="publishedDate"
                                value={formData.publishedDate}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    {/* Featured */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-800 text-primary focus:ring-primary/50"
                        />
                        <label htmlFor="featured" className="text-sm text-gray-400">
                            Mark as featured
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}
                        {loading ? 'Creating...' : 'Create Blog'}
                    </button>
                    <Link
                        href="/admin/dashboard/blogs"
                        className="px-6 py-3 bg-gray-900/50 border border-gray-800 text-gray-400 rounded-lg hover:bg-gray-900 transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
