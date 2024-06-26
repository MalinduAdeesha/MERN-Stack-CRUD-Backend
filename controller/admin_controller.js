import Admin from "../model/admin_model.js";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
  // console.log("create function");

  try {
    const { name, email, password } = req.body;
    // console.log(typeof password, password);

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOne = async (req, res) => {
  // console.log("get function");
  console.log("email : ", req.body.email);
  console.log("pass : ", req.body.password);
  try {
    const userData = await Admin.findOne({ email: req.body.email });
    // console.log(userData);
    if (!userData) {
      res.status(400).json({
        message: "Admin not found",
      });
    } else {
      if (userData.password != req.body.password) {
        res.status(400).json({
          message: "Wrong password",
        });
      } else {
        res.status(200).json({
          message: "Admin can log now",
          userData,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
