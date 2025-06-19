"use client";

import { ExternalLink, Github, GithubIcon, RefreshCw } from "lucide-react";

const projects = Array(6).fill({
    title: "Chainvoice",
    date: "May 2025–Aug 2025",
    description:
        "A decentralized invoicing platform built during Google Summer of Code 2025. It supports privacy-focused billing and multi-token payments.",
    tags: ["Solidity", "Hardhat", "IPFS", "React"],
});

export default function Projects() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-6 py-16 font-mono">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-primary  mb-2 ">Projects</h1>
                <p className="text-xl text-gray-400 mb-12">
                    Things I’ve built, broken, rebuilt, and learned from.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="border border-gray-700 rounded-[5px] p-5 hover:shadow-lg transition-all bg-[#111111]"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-mono text-xl text-white">{project.title}</h2>
                                <span className="text-xs text-gray-500">{project.date}</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag :any, i:any) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded font-mono"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex space-x-4 mt-auto">
                                <GithubIcon size={16} className="cursor-pointer text-gray-500 hover:text-white" />
                                <ExternalLink size={16} className="cursor-pointer text-gray-500 hover:text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
