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
  // let lendersa = await lenderModel.aggregate([
  //   { $project: { count: { $gt: [{ $size: "$borrower" }, n] } } },
  // ]);
  let lenders = await lenderModel.find({});
  let Lenders_Principle = [];
  lenders.forEach((lender) => {
    let principle = 0;
    lender.borrower.forEach((borrower) => {
      principle += borrower.principle;
    });
    // LenderName = lender.lendername;
    let combine = `lendername: ${lender.lendername} and Principle ${principle}`;
    Lenders_Principle.push(combine);
  });
  console.log(`Total principle: ${Lenders_Principle}`);

  return res.status(200).json({ Lenders_Principle });
};
const List = async (req, res) => {
  try {
    req.params = params(req);
    // console.log(req.params);
    const type = req.params.type;
    const n = req.params.n;
    // console.log(type, n);

    if (type !== true) {
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
