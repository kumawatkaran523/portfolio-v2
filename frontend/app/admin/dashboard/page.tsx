'use client';
import Link from 'next/link';
import { BookOpen, FolderOpen, User, ArrowRight, LucideIcon } from 'lucide-react';

type ColorType = 'blue' | 'green' | 'purple';

interface Section {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color: ColorType;
}

const colorClasses: Record<ColorType, string> = {
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40',
    green: 'from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40',
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/40',
};

export default function AdminDashboard() {
    const sections: Section[] = [
        {
            title: 'Blogs',
            description: 'Create, edit, and manage your blog posts',
            icon: BookOpen,
            href: '/admin/dashboard/blogs',
            color: 'blue'
        },
        {
            title: 'Projects',
            description: 'Manage your portfolio projects',
            icon: FolderOpen,
            href: '/admin/dashboard/projects',
            color: 'green'
        },
        {
            title: 'About',
            description: 'Update your about section and profile',
            icon: User,
            href: '/admin/dashboard/about',
            color: 'purple'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-500">Manage your portfolio content</p>
            </div>

            {/* Stats/Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sections.map((section) => {
                    const Icon = section.icon;

                    return (
                        <Link
                            key={section.href}
                            href={section.href}
                            className={`group bg-gradient-to-br ${colorClasses[section.color]} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <Icon className="h-8 w-8 text-primary" />
                                <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                            <p className="text-gray-400 text-sm">{section.description}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 mt-12">
                <h2 className="text-lg font-bold text-white mb-4">Quick Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Total Blogs</p>
                        <p className="text-2xl font-bold text-primary">--</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Total Projects</p>
                        <p className="text-2xl font-bold text-primary">--</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Profile Status</p>
                        <p className="text-2xl font-bold text-primary">Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
