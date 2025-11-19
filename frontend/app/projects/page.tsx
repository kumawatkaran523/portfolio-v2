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
                <div className="text-center">
                    <Loader className="animate-spin text-primary mx-auto mb-3" size={32} />
                    <p className="text-gray-400 text-sm">Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 font-mono">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 sm:mb-12 lg:mb-16">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Projects</h1>
                    </div>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Things I've built, broken, rebuilt, and learned from.
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center py-12 sm:py-16">
                        <div className="border border-gray-800 rounded-lg p-8 sm:p-12 bg-gray-900/30 max-w-md mx-auto">
                            <Code2 className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 text-base sm:text-lg">No projects yet.</p>
                            <p className="text-gray-600 text-xs sm:text-sm mt-2">Check back soon for updates!</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="group border border-gray-800 rounded-xl hover:border-primary/30 active:border-primary/50 transition-all duration-300 bg-[#0b1111] p-4 sm:p-5 hover:shadow-xl hover:shadow-primary/10 active:scale-[0.99]"
                            >
                                {/* Header with Icons */}
                                <div className="flex justify-between items-start mb-3 gap-2">
                                    <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                                        <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight break-words">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap flex-shrink-0 ml-2">
                                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="mb-3">
                                        <span className="text-[10px] sm:text-xs px-2 py-1 bg-primary/20 text-primary rounded-full inline-flex items-center gap-1">
                                            <span>⭐</span>
                                            <span>Featured</span>
                                        </span>
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                                    {project.techStack.slice(0, 5).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] sm:text-xs bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full hover:bg-primary/20 transition-colors whitespace-nowrap"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {project.techStack.length > 5 && (
                                        <span className="text-[10px] sm:text-xs bg-gray-800 text-gray-500 px-2 sm:px-3 py-1 rounded-full">
                                            +{project.techStack.length - 5}
                                        </span>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gray-800 mb-3"></div>

                                {/* Links with Icons */}
                                <div className="flex gap-3 sm:gap-4 justify-between items-center">
                                    <div className="flex gap-2 sm:gap-3">
                                        {project.repoLink && (
                                            <a
                                                href={project.repoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-white active:text-primary transition-colors p-2 hover:bg-gray-900/50 active:bg-gray-900 rounded-lg"
                                                title="GitHub Repository"
                                                aria-label="View GitHub repository"
                                            >
                                                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-primary active:text-primary/80 transition-colors p-2 hover:bg-gray-900/50 active:bg-gray-900 rounded-lg"
                                                title="Live Demo"
                                                aria-label="View live demo"
                                            >
                                                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </a>
                                        )}
                                    </div>
                                    {(!project.repoLink && !project.liveLink) && (
                                        <span className="text-[10px] sm:text-xs text-gray-600 italic">Coming soon</span>
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
