import { prisma } from "../db/prismaClient.js";
import nodemailer from "nodemailer";

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send mail and save to database
export const sendmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: { name, email, message },
    });

    // Send email notification (optional - won't fail if email fails)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: `
                    <h3>New Contact Message</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
      });

      // Send auto-reply to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for contacting me!",
        html: `
                    <h3>Hi ${name},</h3>
                    <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
                    <p>Best regards,<br>Karan Kumawat</p>
                `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue - contact is saved in DB
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Get all contacts (admin only)
export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, isRead } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};
    if (isRead !== undefined) {
      where.isRead = isRead === "true";
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contact.count({ where }),
    ]);

    res.json({
      success: true,
      data: contacts,
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

// Mark contact as read
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { isRead: true },
    });

    res.json({
      success: true,
      message: "Contact marked as read",
      data: contact,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    next(error);
  }
};
