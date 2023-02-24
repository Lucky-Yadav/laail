import express from "express";
import { List } from "../controllers/requestController";

const listRouter = express.Router();

listRouter.get("/list", List);

export default listRouter;



