import { BookOpen, Code, GitCommit, Cpu } from "lucide-react";

export default function BlogPost() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-mono text-gray-300">
            {/* Header */}
            <div className="mb-8 border-b border-gray-800 pb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Code className="h-6 w-6 text-primary" />
                    <span className="text-sm text-gray-500">BLOCKCHAIN DEVELOPMENT</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    Upgradable Smart Contracts: Ensuring Flexibility in Blockchain Applications
                </h1>
                <p className="text-lg text-gray-400">
                    Complete Tutorial on How to upgrade your smart contract for flexibility
                </p>
              </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
                {/* Article Tree */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h3 className="font-medium text-white">Article Tree</h3>
                    </div>
                    <ul className="space-y-2 text-gray-400">
                        <li className="flex items-center gap-2">
                            <GitCommit className="h-4 w-4 text-primary/50" />
                            What are Upgradable Smart Contracts?
                        </li>
                        <li className="flex items-center gap-2">
                            <GitCommit className="h-4 w-4 text-primary/50" />
                            Why Do We Need Upgradable Smart Contracts?
                        </li>
                        <li className="flex items-center gap-2">
                            <GitCommit className="h-4 w-4 text-primary/50" />
                            Types of Upgradable Smart Contracts
                        </li>
                    </ul>
                </div>

                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Cpu className="h-6 w-6 text-primary" />
                        What are Upgradable Smart Contracts?
                    </h2>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                        Upgrading smart contracts refers to the ability to modify or extend the functionality of a deployed smart contract without disrupting the existing system or requiring users to interact with a new contract. This is particularly challenging due to the immutable nature of blockchain, where deployed contracts cannot be changed.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        Upgradable smart contracts solve this by allowing changes while maintaining the same contract address, thus preserving state and user interactions.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Why Do We Need Upgradable Smart Contracts?</h2>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-start gap-3">
                            <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center text-sm mt-0.5 flex-shrink-0">1</span>
                            <div>
                                <strong className="text-white">Bug Fixes and Security Patches:</strong> Smart contracts, like any software, can have bugs or vulnerabilities discovered post-deployment. Upgrades allow these issues to be addressed without requiring users to switch to a new contract.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center text-sm mt-0.5 flex-shrink-0">2</span>
                            <div>
                                <strong className="text-white">Feature Enhancements:</strong> As dApps evolve, new features or improvements may be needed. Upgradable contracts enable adding these enhancements seamlessly.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center text-sm mt-0.5 flex-shrink-0">3</span>
                            <div>
                                <strong className="text-white">Compliance and Regulations:</strong> Regulatory environments can change, necessitating updates to contract logic to ensure ongoing compliance.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Types of Upgradable Smart Contracts</h2>
                    <div className="border border-gray-800 rounded-lg overflow-hidden mb-6">
                        <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800">
                            <h3 className="font-medium text-white">1. Not Really Upgrading (Parametrizing Everything)</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-400 mb-4">
                                This approach involves designing contracts with parameters that can be adjusted without changing the contract code.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-primary mb-2">Pros:</h4>
                                    <ul className="text-gray-400 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">✓</span>
                                            Simple to implement
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">✓</span>
                                            No complex upgrade mechanisms required
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-primary mb-2">Cons:</h4>
                                    <ul className="text-gray-400 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400">✗</span>
                                            Limited flexibility as future changes must be anticipated
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}