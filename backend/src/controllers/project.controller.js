import { prisma } from "../db/prismaClient.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { startDate: 'desc' }
    });

    res.status(200).json({
      message: "Projects fetched successfully",
      projects
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
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

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting project:", error);

    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(500).json({ message: "Server error" });
  }
};
