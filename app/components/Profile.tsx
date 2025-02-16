'use client'
import { Dock, DockIcon } from '@/components/ui/dock'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiEnvelope } from 'react-icons/bi'
import { BsLinkedin, BsTwitterX } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Profile() {
    return (
        <div className='flex flex-row justify-center items-center px-4 py-8 md:py-14 max-w-5xl w-auto'>
            <div className='w-80 md:w-auto'>
                <h2 className='text-2xl font-bold md:text-6xl px-2'>Hi,I'm Ganesh 👋</h2>
                <p className='text-zinc-300 text-sm md:text-xl p-2'>Aspiring Fullstack dev and Blending Web dev, AI, and open source to build, break, and innovate!</p>

                <div className="relative " id="contact">
                    <Dock iconMagnification={60} iconDistance={100}>
                        <DockIcon className="bg-black/10 dark:bg-white/10">
                            {/* <Icons.gitHub className="size-full" /> */}
                            <Link className="size-full" href="https://github.com/ganeshkondaka">
                                <FaGithub className="size-full"></FaGithub>
                            </Link>

                        </DockIcon>
                        <DockIcon className="bg-black/10 dark:bg-white/10">
                            {/* <Icons.googleDrive className="size-full" /> */}
                            <Link className="size-full" href="https://x.com/ganesh_kondaka">
                                <BsTwitterX className="size-full"></BsTwitterX>
                            </Link>

                        </DockIcon>
                        <DockIcon className="bg-black/10 dark:bg-white/10">
                            {/* <Icons.notion className="size-full" /> */}
                            <Link className="size-full" href="https://www.linkedin.com/in/kondaka-ganesh-b402bb252/">
                                <BsLinkedin className="size-full"></BsLinkedin>
                            </Link>

                        </DockIcon>
                        <DockIcon className="bg-black/10 dark:bg-white/10">
                            {/* <Icons.whatsapp className="size-full" /> */}
                            <Link className="size-full" href="mailto:ganeshjo306@gmail.com">
                                <BiEnvelope className="size-full"></BiEnvelope>
                            </Link>

                        </DockIcon>
                    </Dock>
                </div>
            </div>
            <div className='w-auto'>
                <Image src="/dp2.jpg" alt="Ganesh" width={150} height={150} className='aspect-square rounded-full ' />
            </div>
        </div>
    )
}
