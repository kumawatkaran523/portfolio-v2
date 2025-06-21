"use client";
import { ExternalLink, Github, ArrowUpRight, Cpu, Code2 } from "lucide-react";

const projects = [
    {
        title: "Chainvoice",
        date: "Aug 2025",
        description: "A decentralized invoicing platform built during Google Summer of Code 2025. It supports privacy-focused billing and multi-token payments.",
        tags: ["Solidity", "Hardhat", "IPFS", "React"],
        github: "#",
        live: "#"
    },
    {
        title: "Block Explorer",
        date: "Apr 2025",
        description: "An open-source blockchain explorer for Ethereum testnets with custom analytics dashboard.",
        tags: ["Ethers.js", "Next.js", "The Graph", "Tailwind"],
        github: "#",
        live: "#"
    },
    {
        title: "NFT Marketplace",
        date: "Feb 2025",
        description: "A gas-optimized NFT marketplace supporting lazy minting and multi-chain deployments.",
        tags: ["ERC721A", "OpenZeppelin", "Polygon", "Web3.js"],
        github: "#",
        live: "#"
    },
    {
        title: "DeFi Dashboard",
        date: "Dec 2024",
        description: "Real-time DeFi portfolio tracker with yield farming analytics and risk assessment.",
        tags: ["TypeScript", "Chart.js", "WalletConnect", "EIP-1559"],
        github: "#",
        live: "#"
    },
    {
        title: "DAO Tooling",
        date: "Oct 2024",
        description: "Governance toolkit for DAOs featuring proposal systems and voting mechanisms.",
        tags: ["Snapshot", "Gnosis Safe", "IPFS", "ENS"],
        github: "#",
        live: "#"
    },
    {
        title: "Cross-chain Bridge",
        date: "Aug 2024",
        description: "Token bridge supporting EVM and non-EVM chains with optimistic verification.",
        tags: ["LayerZero", "Wormhole", "Axelar", "Solidity"],
        github: "#",
        live: "#"
    }
];

export default function Projects() {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group border border-gray-800 rounded-xl hover:border-primary/30 transition-all duration-300 bg-[#0b1111] p-5"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <Cpu className="h-5 w-5 text-primary" />
                                    <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h2>
                                </div>
                                <span className="text-xs text-gray-500">{project.date}</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-5">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-3 border-t border-gray-800">
                                <a href={project.github} className="text-gray-500 hover:text-white transition-colors">
                                    <Github className="h-4 w-4" />
                                </a>
                                <a href={project.live} className="text-gray-500 hover:text-primary transition-colors">
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
  }