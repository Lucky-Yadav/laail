import { Document, model, Schema } from "mongoose";

import mongoose from "mongoose";

const BorrowerSchema = new mongoose.Schema(
  {
    borrowername: {
      type: String,
      required: true,
    },
    Lender: [{ name: String, principle: Number }],
  },
  { timestamps: true }
);

export default mongoose.model("Borrower", BorrowerSchema);
