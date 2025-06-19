'use client';

import { Mail, Linkedin, Github, Twitter, Coffee } from "lucide-react";
import { useEffect, useState } from 'react';

export default function ContactPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
  
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-6 py-16 font-mono">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-2xl font-bold text-primary mb-4">Contact Me</h1>
                    <p className="text-xl text-gray-400 flex items-center justify-center gap-2">
                        Let's talk <Coffee className="h-5 w-5 text-amber-400" /> about code, ideas, or collaboration
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Email */}
                        <div className="group flex items-start gap-4 p-4 border border-gray-800 rounded-lg hover:border-primary/50 transition-colors">
                            <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm mb-1">Email</h3>
                                <a
                                    href="mailto:kumawatkaran525@gmail.com"
                                    className="text-white hover:text-primary transition-colors"
                                >
                                    kumawatkaran525@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="text-gray-400 text-sm mb-2">Find me online</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <a
                                    href="https://linkedin.com/in/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors group"
                                >
                                    <Linkedin className="h-6 w-6 text-blue-400 group-hover:text-blue-300 mb-2" />
                                    <span className="text-sm">LinkedIn</span>
                                </a>
                                <a
                                    href="https://github.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 border border-gray-800 rounded-lg hover:border-gray-500/50 hover:bg-gray-500/10 transition-colors group"
                                >
                                    <Github className="h-6 w-6 text-gray-400 group-hover:text-white mb-2" />
                                    <span className="text-sm">GitHub</span>
                                </a>
                                <a
                                    href="https://twitter.com/yourhandle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 border border-gray-800 rounded-lg hover:border-blue-400/50 hover:bg-blue-400/10 transition-colors group"
                                >
                                    <Twitter className="h-6 w-6 text-blue-300 group-hover:text-blue-200 mb-2" />
                                    <span className="text-sm">Twitter</span>
                                </a>
                            </div>
                        </div>

                        <div className="p-4 border rounded-lg bg-[#0b1111]/30 group border-primary/30 hover:bg-primary/5 transition-colors">
                            <h3 className="text-gray-400 text-sm mb-2">My Local Time</h3>
                            <div className="text-2xl font-mono text-white mb-1">
                                {currentTime.toLocaleTimeString('en-IN', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">IST (UTC+5:30)</p>
                                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Live
                                </span>
                            </div>
                        </div>
                        
                        <div className="overflow-hidden object-cover transition-transform duration-500 hover:scale-105 flex bg-amber-50 rounded-lg border border-gray-800 hover:border-primary/30 ">
                            <img
                                src="/image.png"
                                alt="Japanese temple illustration"
                                width={200}
                            />
                            <div className="items-end py-16 ">
                                <p className="text-xs text-gray-800 font-semibold font-mono italic">
                                    "The world isn't perfect, but it's there for us, doing the best it can…<br />
                                    That’s what makes it so damn beautiful."<br />
                                    <span className="text-gray-600 ">— Roronoa Zoro</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="border border-gray-800 rounded-lg p-6 bg-[#0b1111]/50">
                        <h2 className="text-xl font-bold text-white mb-6">Send me a message</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-[#0b1111] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-[#0b1111] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={10}
                                    className="w-full bg-[#0b1111] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    placeholder="What would you like to discuss?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <Mail className="h-4 w-4" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}