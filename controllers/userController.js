import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const user = await User.findOne({ username: newUser.username });
    if (!user) {
        await User.create(newUser);
        res.status(201).json("New user registered successfully");
    } else {
        res.status(401);
        throw new Error(`User already exists`);
    }
});

const login = expressAsyncHandler(async (req, res) => {
    const enteredUser = req.body;
    if (!enteredUser) {
        res.status(404);
        throw new Error("User details are required");
    }

    const user = await User.findOne({ username: enteredUser.username });
    if (!user) {
        res.status(401);
        throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(enteredUser.password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error(`Invalid credentials`);
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );

    return res.status(200).json({
        token,
    });
});

export {register, login}
