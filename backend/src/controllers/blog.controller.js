import { prisma } from "../config/database.js";
import { z } from "zod";

// Validation schema
const blogSchema = z.object({
  title: z.string().min(5).max(255),
  subTitle: z.string().min(10).max(500),
  slug: z
    .string()
    .min(3)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  thumbnail: z.string().url().optional(),
  content: z.string().min(50),
  tags: z.array(z.string()),
  articleTree: z.array(z.string()),
  readTime: z.string(),
  publishedDate: z.string().datetime(),
  featured: z.boolean().optional(),
});

// Get all blogs with pagination and filtering
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
        select: {
          id: true,
          title: true,
          subTitle: true,
          slug: true,
          thumbnail: true,
          tags: true,
          readTime: true,
          publishedDate: true,
          views: true,
          featured: true,
        },
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

// Get single blog by slug
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Increment views
    await prisma.blog.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// Create blog
export const createBlog = async (req, res, next) => {
  try {
    const validatedData = blogSchema.parse(req.body);

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Blog with this slug already exists",
      });
    }

    const blog = await prisma.blog.create({
      data: {
        ...validatedData,
        publishedDate: new Date(validatedData.publishedDate),
      },
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    next(error);
  }
};

// Update blog
export const updateBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const validatedData = blogSchema.partial().parse(req.body);

    const blog = await prisma.blog.update({
      where: { slug },
      data: validatedData,
    });

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    next(error);
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    next(error);
  }
};
