import mongoose from "mongoose";

const LenderSchema = new mongoose.Schema(
  {
    lendername: {
      type: String,
      required: true,
    },
    borrower: [{ name: String, principle: Number }],
  },
  { timestamps: true }
);

export default mongoose.model("Lender", LenderSchema);
