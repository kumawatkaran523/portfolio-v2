import React from 'react'

export default function Workexp() {
    return (
        <div className='flex flex-col w-full px-4 py-2 space-y-3'>
            <h2 className='text-xl font-bold pt-4 '>Work Experience</h2>
            
            <div className='flex flex-row items-center w-full justify-between md:px-10 bg-zinc-950 text-white p-2 rounded-xl border border-zinc-700 h-24'>
                <div className='flex flex-row items-center space-x-3 md:space-x-6 '>
                    <img src="/githublogo.png" alt="college logo" className='w-14 h-14 rounded-full' />
                    <div>
                        <p className='font-bold'>Opensource</p>
                        <p className='text-sm text-zinc-300'>Contributor</p>
                    </div>

                </div>
                <p className='text-zinc-400 text-xs sm:text-sm'>2024-Present</p>
            </div>

            <div className='flex flex-row items-center w-full justify-between md:px-10 bg-zinc-950 text-white p-2 rounded-xl border border-zinc-700 h-24'>
                <div className='flex flex-row items-center space-x-3 md:space-x-6 '>
                    <img src="/internship.png" alt="college logo" className='w-14 h-14 rounded-full' />
                    <div>
                        <p className='font-bold'>SmartBridge</p>
                        <p className='text-sm text-zinc-300'>AI/ML Intern</p>
                    </div>

                </div>
                <p className='text-zinc-400 text-xs sm:text-sm'>2023-2024</p>
            </div>

        </div>
    )
}
