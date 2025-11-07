'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LogOut, Home, BookOpen, FolderOpen, User, Loader } from 'lucide-react';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-400">
                <Loader className="animate-spin mx-auto mb-4" size={32} />
                Loading blog...
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
        { name: 'Blogs', href: '/admin/dashboard/blogs', icon: BookOpen },
        { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderOpen },
        { name: 'About', href: '/admin/dashboard/about', icon: User },
    ];

    return (
        <div className="min-h-screen flex bg-[#0a0a0a] text-gray-300 font-mono">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-black/80 border-r border-gray-800 transition-all duration-300 flex flex-col`}>
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    {isSidebarOpen && <h2 className="text-xl font-bold text-primary">Admin</h2>}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-gray-900 rounded transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-900/50 transition-all"
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {isSidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
