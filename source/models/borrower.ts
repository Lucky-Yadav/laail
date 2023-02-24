import mongoose, { Schema, Document } from "mongoose";

export interface ILender extends Document {
  name: string;
  principle: number;
}

export interface IBorrower extends Document {
  borrowername: string;
  Lender: ILender[];
  createdAt: Date;
  updatedAt: Date;
}

const LenderSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  principle: {
    type: Number,
    required: true,
  },
});

const BorrowerSchema: Schema = new Schema(
  {
    borrowername: {
      type: String,
      required: true,
    },
    Lender: [LenderSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IBorrower>("Borrower", BorrowerSchema);
