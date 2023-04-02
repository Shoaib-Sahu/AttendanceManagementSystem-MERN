import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';

// Register A User
export const registerUser = async (req, res) => {
    const { email, } = req.body;
    try {
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ error: "This email is already registered" });
        };

        const user = await userModel.create(req.body)
        res.status(201).json(user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login A User
export const loginUser = async (req, res) => {
    const { email, password, } = req.body;
    try {
        // Checking if user has given password and username both
        if (!email || !password) {
            return res.status(400).json({ error: "Please Enter Email & Password" });
        };

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        };

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({ error: "Invalid username or password" });
        };

        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}