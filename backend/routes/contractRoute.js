const express = require("express");
const {
  addcontract,
  List,
  createLender,
  createBorrower,
} = require("../controllers/contractController.js");
const userRouter = express.Router();

userRouter.post("/register", addcontract);
userRouter.get("/register", List);
userRouter.post("/registerlender", createLender);
userRouter.post("/registerborrower", createBorrower);

module.exports = userRouter;
