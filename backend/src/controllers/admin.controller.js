import { prisma } from "../db/prismaClient.js";
import bcrypt from 'bcrypt'

export const login=async (req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        return res.status(400).json({
            message:"Both fields are required"
        })
    }
    try {
        const user = await prisma.admin.findFirst({ where: { username } });
        if(!user){
            return res.status(401).json({
                message:'invalid credential'
            });
        }
        const isPasswordMatch=await bcrypt.compare(password,user.passwordHash);
        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Password are incorrect"
            })
        }

        return res.status(200).json({
            message:"Login successfully"
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });   
    }
} 

export const getBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        publishedDate: 'desc', 
      },
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        message: "No blogs published yet",
        blogs: [],
      });
    }

    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching blogs",
    });
  }
};

export const createAbout = async (req, res) => {
  try {
    const { aboutMe, working, tools, beyond } = req.body;

    // optional: prevent multiple entries
    const existing = await prisma.about.findFirst();
    if (existing) {
      return res.status(400).json({
        message: "About section already exists. Please use update instead.",
      });
    }

    const newAbout = await prisma.about.create({
      data: {
        aboutMe,
        working,
        tools,
        beyond,
      },
    });

    return res.status(201).json({
      message: "About section created successfully",
      about: newAbout,
    });
  } catch (error) {
    console.error("Error creating About:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }

}

export const updateAbout = async (req, res) => {
  try {
    const { aboutMe, working, tools, beyond } = req.body;
    const existing = await prisma.about.findFirst();
    if (!existing) return res.status(404).json({ message: "About entry not found" });
    
    const updated = await prisma.about.update({
      where: { id: existing.id  },
      data: {
        aboutMe,
        working,
        tools,
        beyond,
      },
    });

    return res.status(200).json({
      message: "About section updated successfully",
      about: updated,
    });
  } catch (error) {
    console.error("Error updating About:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      slug,
      thumbnail,
      content,
      tags,
      articleTree,
      readTime,
      publishedDate
    } = req.body;

    if (!title || !slug || !content || !publishedDate) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        subTitle,
        slug,
        thumbnail,
        content,
        tags,
        articleTree,
        readTime,
        publishedDate
        // createdAt, updatedAt → handled by Prisma
      },
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Blog Creation Error:", error);
    return res.status(500).json({ message: "Something went wrong while creating the blog" });
  }
};

export const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      repoLink,
      liveLink,
      thumbnail,
      startDate,
      endDate
    } = req.body;

    if (!title || !description || !techStack) {
      return res.status(400).json({ message: "Title, description, and techStack are required." });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        repoLink,
        liveLink,
        thumbnail,
        startDate,
        endDate
      }
    });

    return res.status(201).json({
      message: "Project added successfully",
      project
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return res.status(500).json({ message: "Something went wrong while adding the project" });
  }
};