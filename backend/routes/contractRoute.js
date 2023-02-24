const express = require("express");
const {
  addcontract,
  createLender,
  createBorrower,
} = require("../controllers/contractController.js");
const contractRouter = express.Router();

contractRouter.post("/register", addcontract);
contractRouter.post("/registerlender", createLender);
contractRouter.post("/registerborrower", createBorrower);

module.exports = contractRouter;
