import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { fname, lname, email, password, userType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: "error", error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      userType,
    });

    res.json({ status: "ok", user });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: "Server error" });
  }
});

export default router;
