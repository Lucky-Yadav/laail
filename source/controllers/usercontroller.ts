import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  userModel  from '../Models/user';

const SECRET_KEY = 'your_secret_key_here';

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists"})
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashPassword,
            username:username
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({user : result, token : token})
    } catch (error) {
        console.log(error);
        res.status(501).json({message : "something went wrong"})
    }
    // res.send("signup")
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message : "User not found"})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token: token });
        
    } catch (error) {
        console.log(error)
    }
};



