const express = require("express");
const app = express();
const PORT = 3070;
const cors = require("cors");
var jwt = require("jsonwebtoken");
const userRouter = require("./routes/userRoutes");
const contractRouter = require("./routes/contractRoute");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/contract", contractRouter);

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
