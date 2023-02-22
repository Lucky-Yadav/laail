const contractModel = require("../Models/contract");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Secret_key";

const addcontract = async (req, res) => {
  const {
    Id,
    Lender_Id,
    Borrower_Id,
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
    if (registeredcontract) {
      return res.status(400).json({ message: "contract already created" });
    }

    const result = await contractModel.create({
      Id: Id,
      Lender_Id: Lender_Id,
      Borrower_Id: Borrower_Id,
      Principle: Principle,
      Interest: Interest,
      LoanStartDate: LoanStartDate,
      LoanDueDate: LoanDueDate,
      IsRepaid: IsRepaid,
    });

    const token = jwt.sign(
      { email: result.Lender_id, id: result._id },
      SECRET_KEY
    );
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "!Invalid Details" });
  }
  // res.send("signup")
};
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
// const volunteerlist = async (req, res) => {
//     try {

//         req.params = params(req);
//         console.log(req.params);
//         const language = req.params.language
//         const location = req.params.location
//         const volunteerlist = await volenteerModel.find({});
//         const volunteerlistbylanguage = await volenteerModel.find({ language: language });
//         const volunteerlistbylocation = await volenteerModel.find({ location: location });
//         return res.send({
//            volunteerlist,
//            volunteerlistbylanguage,
//            volunteerlistbylocation
//        });
//      } catch (error) {
//        console.error(error.message);
//        res.send("internal error ");
//      }
// }

module.exports = { addcontract };
