'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle, LogIn } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setSuccess('Login successful! Redirecting...');
            localStorage.setItem('authToken', data.token);

            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 1500);

        } catch (err:any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-gray-300 font-mono px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-2">Admin</h1>
                    <p className="text-gray-500">pixelpenguin.sh</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-6 backdrop-blur-sm">

                    {/* Error Alert */}
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Success Alert */}
                    {success && (
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <p className="text-green-400 text-sm">{success}</p>
                        </div>
                    )}

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary/10 hover:bg-primary/20 disabled:opacity-50 border border-primary/30 text-primary py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        <LogIn className="h-4 w-4" />
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    Protected Admin Area
                </p>
            </div>
        </div>
    );
}
