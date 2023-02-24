const contractModel = require("../Models/contract");
const lenderModel = require("../Models/lender");
const borrowerModel = require("../Models/borrower");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Secret_key";

const addcontract = async (req, res) => {
  const {
    Id,
    Lender,
    Borrower,
    Principle,
    Interest,
    LoanStartDate,
    LoanDueDate,
    IsRepaid,
  } = req.body;

  try {
    const registeredcontract = await contractModel
      .findOne({ Id: Id })
      .catch((err) => {
        console.log(err);
        return err;
      });
    const registeredlender = await lenderModel
      .findOne({ lendername: Lender })
      .catch((err) => {
        console.log(err);
        return err;
      });
    if (!registeredlender) {
      return res.status(400).json({ message: "Lender not Found" });
    }
    const registeredborrower = await borrowerModel
      .findOne({ borrowername: Borrower })
      .catch((err) => {
        console.log(err);
        return err;
      });
    if (!registeredborrower) {
      return res.status(400).json({ message: "borrower not Found" });
    }
    if (registeredcontract) {
      return res.status(400).json({ message: "contract already created" });
    }

    const newBorrower = { name: Borrower, principle: Principle };
    const updateLender = await lenderModel
      .findOneAndUpdate(
        { lendername: Lender },
        { $push: { borrower: newBorrower } },
        { new: true }
      )
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log(updateLender);

    const newLender = { name: Borrower, principle: Principle };
    const updateBorrower = await borrowerModel
      .findOneAndUpdate(
        { borrowername: Borrower },
        { $push: { Lender: newLender } },
        { new: true }
      )
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log(updateBorrower);

    const result = await contractModel.create({
      Id: Id,
      Lender: Lender,
      Borrower: Borrower,
      Principle: Principle,
      Interest: Interest,
      LoanStartDate: LoanStartDate,
      LoanDueDate: LoanDueDate,
      IsRepaid: IsRepaid,
    });

    const token = jwt.sign(
      { email: result.Lender, id: result._id },
      SECRET_KEY
    );
    res
      .status(201)
      .json({ user: result, token: token, updatedlender: updateLender });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "!Invalid Details" });
  }
};


const createLender = async (req, res) => {
  const { lendername } = req.body;
  try {
    const registeredLender = await lenderModel
      .findOne({ lendername: lendername })
      .catch((err) => {
        console.log(err);
        return err;
      });

    if (registeredLender) {
      return res.status(400).json({ message: "Lender already created" });
    }
    const result = await lenderModel.create({
      lendername: lendername,
    });
    res.status(201).json({ lender: result });
  } catch (error) {
    console.error(error.message);
    res.status(501).json({ message: "!Invalid Details" });
  }
};
const createBorrower = async (req, res) => {
  const { borrowername } = req.body;
  try {
    const registeredborrower = await borrowerModel
      .findOne({ borrowername: borrowername })
      .catch((err) => {
        console.log(err);
        return err;
      });

    if (registeredborrower) {
      return res.status(400).json({ message: "borrower already created" });
    }
    const result = await borrowerModel.create({
      borrowername: borrowername,
    });
    res.status(201).json({ lender: result });
  } catch (error) {
    console.error(error.message);
    res.status(501).json({ message: "!Invalid Details" });
  }
};

module.exports = { addcontract,  createLender, createBorrower };
