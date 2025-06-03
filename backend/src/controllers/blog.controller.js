import { prisma } from "../db/prismaClient.js";

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

export const updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      title,
      subTitle,
      thumbnail,
      content,
      tags,
      articleTree,
      readTime,
      publishedDate
    } = req.body;

    const blog = await prisma.blog.update({
      where: { slug },
      data: {
        title,
        subTitle,
        thumbnail,
        content,
        tags,
        articleTree,
        readTime,
        publishedDate
      }
    });

    res.status(200).json({
      message: "Blog updated successfully",
      blog
    });
  } catch (error) {
    console.error("Error updating blog:", error);

    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(500).json({ message: "Server error" });
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

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      message: "Blog deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting blog:", error);

    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { slug }
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      blog
    });

  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    res.status(500).json({ message: "Server error" });
  }
};
