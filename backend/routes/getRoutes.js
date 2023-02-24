const express = require("express");
const { List } = require("../controllers/requestController");

const listRouter = express.Router();

listRouter.get("/list", List);

module.exports = listRouter;
