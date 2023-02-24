import express, { Router } from "express";
import {
addcontract,
createLender,
createBorrower,
} from "../controllers/contractController.js";

const contractRouter: Router = express.Router();

contractRouter.post("/register", addcontract);
contractRouter.post("/registerlender", createLender);
contractRouter.post("/registerborrower", createBorrower);

export default contractRouter;