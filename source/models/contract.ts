import { Schema, model } from "mongoose";

const contractSchema: Schema = new Schema(
  {
    Id: {
      type: String,
      required: true,
    },
    Lender: {
      type: String,
      required: true,
    },
    Borrower: {
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

export default model("contract", contractSchema);
