import { prisma } from "../db/prismaClient.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({
            message:"Login successfully",
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });   
    }
} 

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



