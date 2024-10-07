import User from "../modals/user.js";
import bcryptjs from "bcryptjs";
import  jwt from "jsonwebtoken"

const JWT_SECRET = "BOOK_STORE"; 

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedpassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname: fullname,
      email: email,
      password: hashedpassword,
    });
    await createdUser.save();
    res.status(201).json({
      message: "User Created Successfully!!",
      user: {
        _id: createdUser.id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error :" + error.message);
    res.status(500).json({ message: "Internal Server Error !!" });
  }
};





export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: "30d" } 
    );

    res.status(200).json({
      message: "Logged in Successfully!!",
      token, 
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error :" + error.message);
    res.status(500).json({ message: "Internal Server Error !!" });
  }
};