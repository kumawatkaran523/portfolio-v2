import React from "react";
import { BiGlobe } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

export default function Projects() {
    return (
        <div className="flex flex-col space-y-4 justify-center items-center pt-10 text-xl px-4">
            <p className=" px-2 p-1 text-sm bg-white text-black rounded-lg">Projects</p>
            <p className="font-bold text-4xl text-center">Check out my latest work</p>
            <p className="text-zinc-400 text-sm pb-10 text-center">
                I've worked on a variety of projects, from simple websites to complex
                web applications. Here are a few of my favorites.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:mx-32 w-full max-w-3xl">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="w-full rounded-2xl p-4 border flex flex-col justify-between"
                    >
                        <img
                            src="/solana.png"
                            alt="solana pj"
                            className="rounded-2xl h-40 w-full overflow-hidden object-cover object-top"
                        />
                        <p className="font-bold py-2 pt-6 text-lg">AI Landing Page</p>
                        <p className="text-xs text-zinc-400">
                            Developed an amazing Portfolio to showcase my work to potential
                            recruiters. I used latest web designing techniques like TailwindCSS
                            and Shadcn UI to make it look good and Next.js to make it fast.
                        </p>
                        <div className="flex flex-wrap gap-1 py-6">
                            {["Typescript", "Nextjs", "Tailwind", "Gemini", "Shadcn"].map(
                                (tech) => (
                                    <p key={tech} className="bg-zinc-700 px-2 py-1 rounded text-xs">
                                        {tech}
                                    </p>
                                )
                            )}
                        </div>
                        <div className="flex space-x-2 p-2">
                            <button className="rounded bg-white px-3 py-1 text-xs text-black flex items-center gap-1">
                                <BiGlobe /> Link
                            </button>
                            <button className="rounded bg-white px-3 py-1 text-xs text-black flex items-center gap-1">
                                <BsGithub /> Source
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
