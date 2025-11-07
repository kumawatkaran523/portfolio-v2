import { prisma } from "../db/prismaClient.js";

export const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, tag, search, featured } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};

    if (tag) {
      where.tags = { has: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { subTitle: { contains: search, mode: "insensitive" } },
      ];
    }

    if (featured !== undefined) {
      where.featured = featured === "true";
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take,
        orderBy: { publishedDate: "desc" },
      }),
      prisma.blog.count({ where }),
    ]);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({ where: { slug } });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    await prisma.blog.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
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
      publishedDate,
      featured,
    } = req.body;

    if (!title || !slug || !content) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Title, slug, and content are required",
        });
    }

    const existingBlog = await prisma.blog.findUnique({ where: { slug } });

    if (existingBlog) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Blog with this slug already exists",
        });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        subTitle,
        slug,
        thumbnail,
        content,
        tags: tags || [],
        articleTree: articleTree || [],
        readTime: readTime || "5 min",
        publishedDate: new Date(publishedDate),
        featured: featured || false,
      },
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Blog created successfully",
        data: blog,
      });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
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
      publishedDate,
      featured,
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
        publishedDate: new Date(publishedDate),
        featured,
      },
    });

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({ where: { id: parseInt(id) } });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    next(error);
  }
};
