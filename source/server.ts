import * as dotenv from 'dotenv' 
dotenv.config()
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import contractRouter from "./routes/contractRoute";
import listRouter from "./routes/getRoutes";

const app = express();
const PORT: number = 3070;

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/contract", contractRouter);
app.use("/lists", listRouter);


mongoose
  .connect(`${process.env.SECRET_KEY}`)
  .then(() => {
    console.log("handshake successful");
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
