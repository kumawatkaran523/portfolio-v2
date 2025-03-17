export interface projects_d {
    name: string;
    href: string;
    repo: string;
    description: string;
    image: string;
    technologies: string[];
}

export const project_list: projects_d[] = [
    {
        name: 'AI Content Generator',
        href: 'https://barbasol.vercel.app/',
        repo: 'https://github.com/ganeshkondaka/barbasol',
        description: `An AI-powered platform that generates creative content ideas, hashtags, 
                      and project name suggestions. Built using Next.js, Tailwind CSS, and 
                      Google Gemini API. Features a sleek dark UI with vibrant gradients.`,
        image: '/aicontent.png',
        technologies: ['Next.js', 'Tailwind CSS', 'Prisma-ORM', 'Postgresql', 'Gemini API', 'TypeScript', 'Clerk']
    },
    {
        name: 'Gyan Card',
        href: 'https://gyan-card.vercel.app/',
        repo: 'https://github.com/ganeshkondaka/Gyan-card',
        description: `A simple Portfolio Website Builder | A digital knowledge-sharing platform that allows users to create, 
                      share, and explore insightful "Gyan Cards." Built with a minimal UI 
                      using React and Tailwind CSS. Supports markdown-based content sharing.`,
        image: '/gyancard.png',
        technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Prisma-ORM', 'Postgresql']
    },
    {
        name: 'XBlog App',
        href: 'https://xblog-amber.vercel.app/',
        repo: 'https://github.com/ganeshkondaka/xblog',
        description: `A full-stack blogging platform with features like user authentication, 
                      post creation, and rich text editing. Developed using TypeScript, 
                      Prisma, and a monorepo structure. Optimized for fast content delivery.`,
        image: '/xblogimg.png',
        technologies: ['Hono', 'Tailwind CSS', 'React.js', 'Prisma', 'Postgresql', 'TypeScript' ]
    },
    {
        name: 'Chat App',
        href: 'https://mern-chatapp-frontend-psi.vercel.app/',
        repo: 'https://github.com/ganeshkondaka/mern_chatapp_frontend',
        description: `A real-time chat application using WebSockets for instant messaging. 
                      Supports private and group chats with a responsive UI. Built using 
                      the MERN stack with MongoDB for message storage.`,
        image: '/chatapp.png',
        technologies: ['React', 'Express.js', 'MongoDB', 'Node.js', 'Socket.io', 'JWT']
    },
    {
        name: 'SocNet',
        href: 'https://socnet-frontend-one.vercel.app/',
        repo: 'https://github.com/ganeshkondaka/mern_chatapp_frontend',
        description: `A simple web app that is used to show all your social media accounts like Linktree . Easily consolidate
                        all your social media accounts in one place. Create a profile and share
                        a single link that connects everyone to all your platforms..`,
        image: 'socnet.png',
        technologies: ['React', 'Tailwind CSS', 'MongoDB', 'JavaScript', 'Express']
    },
    {
        name: 'Github UI Portfolio Website',
        href: 'https://gttheme.vercel.app/',
        repo: 'https://github.com/ganeshkondaka/portfolio_GH',
        description: `A personal portfolio designed like github dashboard UI showcasing projects, skills, and experiences. 
                      Designed with a modern and clean UI using TypeScript and Next.js. 
                      Includes interactive elements and a smooth navigation experience.`,
        image: '/gttheme.png',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS']
    },
    // {
    //     name: 'GitHub Themed Portfolio',
    //     href: 'https://gttheme.vercel.app/',
    //     repo: 'https://github.com/ganesh-ai/github-themed-portfolio',
    //     description: `A unique portfolio inspired by GitHub's UI, featuring repositories, 
    //                   contributions, and an activity graph. Built with Next.js and Tailwind CSS. 
    //                   Ideal for developers who love the GitHub aesthetic.`,
    //     image: 'https://example.com/github-themed-portfolio.png',
    //     technologies: ['Next.js', 'Tailwind CSS', 'TypeScript']
    // },
    // {
    //     name: 'Traffic Sign Board',
    //     href: 'https://2bxyuirgwqswmwppdwwgmxtrafficwebapp.streamlit.app/',
    //     repo: 'https://github.com/ganesh-ai/traffic-sign-board',
    //     description: `A machine learning-based web app that detects and classifies traffic 
    //                   signs. Built using Python, Streamlit, and OpenCV for real-time analysis. 
    //                   Helps users learn and recognize road signs efficiently.`,
    //     image: 'https://example.com/traffic-sign-board.png',
    //     technologies: ['Python', 'Streamlit', 'OpenCV', 'Machine Learning']
    // },
    // {
    //     name: 'Spam Mail Prediction System',
    //     href: 'https://spammailpredictionwebapp-lck76iojgroa7aq4xwimnispamprediction.streamlit.app/',
    //     repo: 'https://github.com/ganesh-ai/spam-mail-prediction',
    //     description: `A web-based machine learning tool to detect spam emails. Uses NLP 
    //                   techniques and classification algorithms. Built with Python, Streamlit, 
    //                   and Scikit-learn for accurate spam filtering.`,
    //     image: 'https://example.com/spam-mail-prediction.png',
    //     technologies: ['Python', 'Streamlit', 'Scikit-learn', 'NLP']
    // }
];
