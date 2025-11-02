"use client";
import { Terminal, RotateCw, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 flex items-center justify-center font-mono p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <Terminal className="h-16 w-16 text-primary animate-pulse" />
        </div>

        <div className="mb-6">
          <span className="text-primary text-8xl font-bold">404</span>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-cyan-300 mt-2"></div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto">
          The requested URL returned 404. Maybe the resource was moved or
          deleted.
        </p>

        <div className="bg-[#0b1111] border border-gray-800 rounded-lg p-4 mb-8 text-left max-w-lg mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="text-primary">$</span>
            <span>debug --error=404</span>
          </div>
          <div className="text-sm space-y-1">
            <p className="text-red-400">ERROR: Route not found</p>
            <p className="text-gray-400">STATUS: 404 Not Found</p>
            <p className="text-gray-400">
              PATH:{" "}
              {typeof window !== "undefined" ? window.location.pathname : "/"}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCw className="h-4 w-4" />
            Refresh Page
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          If you believe this is a mistake, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact me
          </Link>
        </p>
      </div>
    </div>
  );
}
