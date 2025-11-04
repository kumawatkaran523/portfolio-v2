import { prisma } from "../config/database.js";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10),
  techStack: z.array(z.string()),
  repoLink: z.string().url().optional(),
  liveLink: z.string().url().optional(),
  thumbnail: z.string().url().optional(),
  featured: z.boolean().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
});

// Get all projects
export const getAllProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;

    const where = {};
    if (featured !== undefined) {
      where.featured = featured === "true";
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ featured: "desc" }, { startDate: "desc" }],
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Get single project
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Add project
export const addProject = async (req, res, next) => {
  try {
    const validatedData = projectSchema.parse(req.body);

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project,
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

// Update project
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = projectSchema.partial().parse(req.body);

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: validatedData,
    });

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
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
        message: "Project not found",
      });
    }
    next(error);
  }
};

// Delete project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    next(error);
  }
};
