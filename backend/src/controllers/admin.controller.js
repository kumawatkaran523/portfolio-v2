import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prismaClient.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password required",
      });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: { id: admin.id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
};

export const getAbout = async (req, res, next) => {
  try {
    const about = await prisma.about.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About section not found",
      });
    }

    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

export const createAbout = async (req, res, next) => {
  try {
    const { aboutMe, working, tools, beyond, profileImage, resumeUrl } =
      req.body;

    const existingAbout = await prisma.about.findFirst();
    if (existingAbout) {
      return res.status(400).json({
        success: false,
        message: "About section already exists. Use update instead.",
      });
    }

    const about = await prisma.about.create({
      data: { aboutMe, working, tools, beyond, profileImage, resumeUrl },
    });

    res.status(201).json({
      success: true,
      message: "About section created successfully",
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAbout = async (req, res, next) => {
  try {
    const { aboutMe, working, tools, beyond, profileImage, resumeUrl } =
      req.body;

    const about = await prisma.about.findFirst();
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About section not found",
      });
    }

    const updatedAbout = await prisma.about.update({
      where: { id: about.id },
      data: { aboutMe, working, tools, beyond, profileImage, resumeUrl },
    });

    res.json({
      success: true,
      message: "About section updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Username, password, and email required",
      });
    }

    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { username, passwordHash: hashedPassword, email },
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: { id: admin.id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
};
