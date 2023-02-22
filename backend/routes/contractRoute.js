const express = require("express");
const { addcontract} = require("../controllers/contractController.js");
const userRouter = express.Router();

userRouter.post("/register", addcontract);
// userRouter.get("/register", volunteerlist);

module.exports = userRouter;
