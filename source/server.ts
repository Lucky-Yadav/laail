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
  .connect(
    "mongodb+srv://luckyyadav8627:NfWCnHm4bEQX6zKT@cluster0.8jmy2ez.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("handshake successful");
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
