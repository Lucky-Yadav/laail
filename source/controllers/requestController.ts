import { Request, Response } from "express";
import contractModel from "../Models/contract";
import lenderModel from "../Models/lender";
import borrowerModel from "../Models/borrower";

const params = (req: Request) => {
  let q = req.url.split("?"),
    result: any = {};
  if (q.length >= 1) {
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

const getlistbytype = async (type: string, res: Response) => {
  try {
    let list: any;
    if (type === "lenders") {
      list = await lenderModel.find({});
    } else if (type === "borrowers") {
      list = await borrowerModel.find({});
    } else if (type === "contracts") {
      list = await contractModel.find({});
    }
    return res.status(200).json({ list });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const filterbyn = async (n: number, res: Response) => {
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
    // {
    //   $limit: n,
    // },
  ]);
  let output: string[] = [];
  lenders.forEach((lender) => {
    output.push(`LenderName: ${lender._id}, Total: ${lender.principle}`);
  });
  return res.status(200).json({ output });
};

const List = async (req: Request, res: Response) => {
  try {
    req.params = params(req);
    const type = req.params.type;
    const n = parseInt(req.params.n);

    if (type !== undefined) {
      await getlistbytype(type, res);
    } else if (n !== undefined) {
      await filterbyn(n, res);
    } else {
      return res.status(400).json({ message: "please provide params" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { List };
