const mongoose = require("mongoose");

const BorrowerSchema = mongoose.Schema(
  {
    borrowername: {
      type: String,
      required: true,
    },
    Lender: [{name: String, principle: Number}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrower", BorrowerSchema);
