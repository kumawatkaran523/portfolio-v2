import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database.js";
import { z } from "zod";

// Validation schemas
const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
});

const aboutSchema = z.object({
  aboutMe: z.string().min(10),
  working: z.array(z.string()),
  tools: z.record(z.any()),
  beyond: z.string().min(10),
  profileImage: z.string().url().optional(),
  resumeUrl: z.string().url().optional(),
});

// Login
export const login = async (req, res, next) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

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
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
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

// Get About
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

    res.json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

// Create About
export const createAbout = async (req, res, next) => {
  try {
    const validatedData = aboutSchema.parse(req.body);

    // Check if about already exists
    const existingAbout = await prisma.about.findFirst();
    if (existingAbout) {
      return res.status(400).json({
        success: false,
        message: "About section already exists. Use update instead.",
      });
    }

    const about = await prisma.about.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: "About section created successfully",
      data: about,
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

// Update About
export const updateAbout = async (req, res, next) => {
  try {
    const validatedData = aboutSchema.parse(req.body);

    const about = await prisma.about.findFirst();
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About section not found",
      });
    }

    const updatedAbout = await prisma.about.update({
      where: { id: about.id },
      data: validatedData,
    });

    res.json({
      success: true,
      message: "About section updated successfully",
      data: updatedAbout,
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

// Create initial admin (should be run once)
export const createAdmin = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        username,
        passwordHash: hashedPassword,
        email,
      },
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
