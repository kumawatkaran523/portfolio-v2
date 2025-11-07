import { prisma } from "../db/prismaClient.js";

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

    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      techStack,
      repoLink,
      liveLink,
      thumbnail,
      featured,
      startDate,
      endDate,
    } = req.body;

    if (!title || !description || !startDate) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Title, description, and startDate are required",
        });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack: techStack || [],
        repoLink,
        liveLink,
        thumbnail,
        featured: featured || false,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Project added successfully",
        data: project,
      });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      techStack,
      repoLink,
      liveLink,
      thumbnail,
      featured,
      startDate,
      endDate,
    } = req.body;

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        techStack,
        repoLink,
        liveLink,
        thumbnail,
        featured,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({ where: { id: parseInt(id) } });

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    next(error);
  }
};
