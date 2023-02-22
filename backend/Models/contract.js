const mongoose = require("mongoose");

const contractSchema = mongoose.Schema(
  {
    Id: {
      type: String,
      required: true,
    },
    Lender_Id: {
      type: String,
      required: true,
    },
    Borrower_Id: {
      type: String,
    },
    Principle: {
      type: Number,
    },
    Interest: {
      type: Number,
      required: true,
    },
    LoanStartDate: {
      type: String,
      required: true,
    },
    LoanDueDate: {
      type: String,
      required: true,
    },
    IsRepaid: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contract", contractSchema);
