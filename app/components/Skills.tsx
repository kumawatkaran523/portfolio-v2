import React from 'react'

export default function Skills() {

    const skills_list:string[]=["Typescript","Nextjs","React","Expressjs","Prisma-ORM","TailwindCSS","postgresql","mongoDB","Docker","Javascript","Python","Git","Machine learning","Tensorflow","Pandas","Keras"]

  return (
    <div className='inline px-4 py-2'>
        <p className='text-xl font-bold my-2'>Skills</p>
        {
            skills_list.map((item,index)=>(
                <div key={index} className=" items-center inline-flex text-[12px] text-black font-bold  px-2 py-1 border-2 bg-white rounded-lg hover:bg-zinc-400 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    {item}
                </div>
            ))
        }
    </div>
  )
}
