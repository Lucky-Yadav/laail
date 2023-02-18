/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import userModel from "../Models/user";
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
  
    try {
      const existinguser = await userModel.findOne({ email: email });
      if (existinguser) {
        return res.status(400).json({ message: "User already exists" });
      } 
      const hashpassword = await bcrypt.hash(password, 10);
  
      const result = await userModel.create({
        email: email,
        password: hashpassword,
        username: username,
      });
  
      const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
      res.status(201).json({ user: result, token: token });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: "something went wrong" });
    }
    // res.send("signup")
  };

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };