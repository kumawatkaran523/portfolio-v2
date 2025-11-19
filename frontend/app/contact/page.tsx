'use client';

import { Mail, Linkedin, Github, Twitter, Coffee, Loader, Send } from "lucide-react";
import { useEffect, useState } from 'react';

export default function ContactPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 font-mono">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10 sm:mb-12 lg:mb-16 text-center px-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
                        Contact Me
                    </h1>
                    <div className="text-base sm:text-lg lg:text-xl text-gray-400 space-y-1">
                        <div className="flex items-center justify-center gap-2">
                            <span>Let's talk</span>
                            <Coffee className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                        </div>
                        <div>about code, ideas, or collaboration</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Email */}
                        <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-800 rounded-lg hover:border-primary/50 transition-colors">
                            <div className="p-2 sm:p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors flex-shrink-0">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-gray-400 text-xs sm:text-sm mb-1">Email</h3>
                                <a
                                    href="mailto:kumawatkaran525@gmail.com"
                                    className="text-sm sm:text-base text-white hover:text-primary transition-colors break-all block"
                                >
                                    kumawatkaran525@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-gray-400 text-xs sm:text-sm mb-2">Find me online</h3>
                            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                <a
                                    href="https://www.linkedin.com/in/karan-kumawat-26770b24a/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 sm:p-4 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-95 transition-all group"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 group-hover:text-blue-300 mb-1 sm:mb-2" />
                                    <span className="text-[10px] sm:text-xs">LinkedIn</span>
                                </a>
                                <a
                                    href="https://github.com/kumawatkaran523/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 sm:p-4 border border-gray-800 rounded-lg hover:border-gray-500/50 hover:bg-gray-500/10 active:scale-95 transition-all group"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-white mb-1 sm:mb-2" />
                                    <span className="text-[10px] sm:text-xs">GitHub</span>
                                </a>
                                <a
                                    href="https://x.com/KaranKu33693483"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 sm:p-4 border border-gray-800 rounded-lg hover:border-blue-400/50 hover:bg-blue-400/10 active:scale-95 transition-all group"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300 group-hover:text-blue-200 mb-1 sm:mb-2" />
                                    <span className="text-[10px] sm:text-xs">Twitter</span>
                                </a>
                            </div>
                        </div>

                        {/* Local Time */}
                        <div className="p-3 sm:p-4 border rounded-lg bg-[#0b1111]/30 group border-primary/30 hover:bg-primary/5 transition-colors">
                            <h3 className="text-gray-400 text-xs sm:text-sm mb-2">My Local Time</h3>
                            <div className="text-xl sm:text-2xl font-mono text-white mb-1">
                                {currentTime.toLocaleTimeString('en-IN', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-[10px] sm:text-xs text-gray-500">IST (UTC+5:30)</p>
                                <span className="text-[10px] sm:text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Live
                                </span>
                            </div>
                        </div>

                        {/* Quote Card */}
                        <div className="overflow-hidden rounded-lg border border-gray-800 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] bg-amber-50">
                            <div className="flex flex-row">
                                <img
                                    src="/image.png"
                                    alt="Japanese temple illustration"
                                    className=" sm:w-32 h-32 sm:h-44 object-cover"
                                />
                                <div className="p-3 sm:p-4 flex items-center">
                                    <p className="text-[10px] sm:text-xs text-gray-800 font-semibold font-mono italic leading-relaxed">
                                        "The world isn't perfect, but it's there for us, doing the best it can…
                                        That's what makes it so damn beautiful."
                                        <span className="block text-gray-600 mt-2">— Roronoa Zoro</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="border border-gray-800 rounded-lg p-4 sm:p-6 bg-[#0b1111]/50 hover:border-gray-700 transition-colors">
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Send me a message</h2>
                        {success && (
                            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-xs sm:text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                ✓ Message sent successfully!
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-xs sm:text-sm text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#0b1111] border border-gray-800 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#0b1111] border border-gray-800 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs sm:text-sm text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full bg-[#0b1111] border border-gray-800 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                                    placeholder="What would you like to discuss?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary/10 hover:bg-primary/20 active:bg-primary/30 border border-primary/30 hover:border-primary/50 text-primary py-2.5 sm:py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-sm sm:text-base"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="h-4 w-4 animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
