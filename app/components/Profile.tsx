import Image from 'next/image'
import React from 'react'

export default function Profile() {
    return (
        <div className='flex flex-row justify-center items-center px-4 py-8 md:py-14 max-w-5xl '>
            <div className='w-80 md:w-auto'>
                <h2 className='text-3xl font-bold md:text-6xl'>Hi, I'm Ganesh 👋</h2>
                <p className='text-zinc-300 text-sm md:text-xl p-2'>Aspiring Fullstack dev and Blending Web dev, AI, and open source to build, break, and innovate!</p>
            </div>
            <div className='w-auto'>
                <Image src="/ganesh.png" alt="Ganesh" width={150} height={150} className='aspect-square rounded-full ' />
            </div>
        </div>
    )
}
