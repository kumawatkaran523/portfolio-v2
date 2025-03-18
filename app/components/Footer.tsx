import React from 'react'

export default function Footer() {
    return (
        <div className='flex flex-col items-center py-20 text-center max-w-3xl px-6 md:px-0'>
            <p className=" px-2 p-1 my-14 text-sm bg-white text-black rounded-lg">Contact</p>
            <p className='font-bold text-3xl lg:text-5xl pb-8 text-zinc-100'>Get in Touch</p>
            <p className='pt-4 text-xs md:text-lg text-zinc-300'>Feel free to reach out for hiring, collaboration, or any inquiries. I'm always open to new opportunities and passionate about contributing to meaningful projects. Let's connect and create something amazing together</p>
            <div className='pt-20 text-zinc-600 text-xs'>
                made with ♥️ by Ganesh <br />
                © 2025 Portfolio Ganesh. All rights reserved.
            </div>
        </div >
    )
}
