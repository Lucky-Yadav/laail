const mongoose = require("mongoose");

const LenderSchema = mongoose.Schema(
  {
    lendername: {
      type: String,
      required: true,
    },
    borrower: [{ name: String, principle: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lender", LenderSchema);
