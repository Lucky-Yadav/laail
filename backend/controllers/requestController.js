const contractModel = require("../Models/contract");
const lenderModel = require("../Models/lender");
const borrowerModel = require("../Models/borrower");
// const mongoose = require("mongoose");

var params = function (req) {
  let q = req.url.split("?"),
    result = {};
  if (q.length >= 2) {
    q[1].split("&").forEach((item) => {
      try {
        result[item.split("=")[0]] = item.split("=")[1];
      } catch (e) {
        result[item.split("=")[0]] = "";
      }
    });
  }
  return result;
};
const getlistbytype = async (type, res) => {
  var list;
  if (type === "lenders") {
    list = await lenderModel.find({});
  } else if (type === "borrowers") {
    list = await borrowerModel.find({});
  } else if (type === "contracts") {
    list = await contractModel.find({});
  }
  //   console.log(list)
  return res.status(200).json({ list });
};
const filterbyn = async (n, res) => {
  console.log(n);
  let lenders = await contractModel.aggregate([
    {
      $group: {
        _id: "$Lender",
        count: { $sum: 1 },
        principle: { $sum: "$Principle" },
      },
    },
    {
      $match: {
        count: { $gte: n },
      },
    },
    {
      $sort: {
        principle: 1,
      },
    },
    {
      $limit: n,
    },
  ]);
  let output = [];
  lenders.forEach((lender) => {
    console.log(lender._id);
    output.push(`LenderName: ${lender._id}, Total: ${lender.principle}`);
  });
  return res.status(200).json({ output });
};
const List = async (req, res) => {
  try {
    req.params = params(req);
    // console.log(req.params);
    const type = req.params.type;
    const n = parseInt(req.params.n);
    // console.log(type, n);

    if (type !== undefined) {
      console.log("type", type);
      await getlistbytype(type, res);
    } else if (n !== undefined) {
      console.log(n);
      await filterbyn(n, res);
    } else {
      return res.status(400).json({ message: "please provide params" });
    }
  } catch (error) {
    console.error(error.message);
    res.send("internal error ");
  }
};

module.exports = { List };
