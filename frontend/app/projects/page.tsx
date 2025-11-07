'use client';
import { ExternalLink, Github, ArrowUpRight, Cpu, Code2, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    repoLink?: string;
    liveLink?: string;
    thumbnail?: string;
    featured: boolean;
    startDate: string;
    endDate?: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?limit=100`);
                const data = await response.json();
                setProjects(data.data || []);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-4 sm:px-6 py-16 font-mono">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <Code2 className="h-6 w-6 text-primary" />
                        <h1 className="text-3xl font-bold text-primary">Projects</h1>
                    </div>
                    <p className="text-xl text-gray-400 max-w-3xl">
                        Things I've built, broken, rebuilt, and learned from.
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No projects yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="group border border-gray-800 rounded-xl hover:border-primary/30 transition-all duration-300 bg-[#0b1111] p-5 hover:shadow-xl hover:shadow-primary/10"
                            >
                                {/* Header with Icons */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <Cpu className="h-5 w-5 text-primary flex-shrink-0" />
                                        <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="mb-3">
                                        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                                            ⭐ Featured
                                        </span>
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-5 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.techStack.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gray-800 mb-3"></div>

                                {/* Links with Icons */}
                                <div className="flex gap-4 justify-between items-center">
                                    <div className="flex gap-3">
                                        {project.repoLink && (
                                            <a
                                                href={project.repoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-gray-900/50 rounded-lg"
                                                title="GitHub Repository"
                                            >
                                                <Github className="h-5 w-5" />
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-primary transition-colors p-2 hover:bg-gray-900/50 rounded-lg"
                                                title="Live Demo"
                                            >
                                                <ArrowUpRight className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                    {(!project.repoLink && !project.liveLink) && (
                                        <span className="text-xs text-gray-600">Coming soon</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
