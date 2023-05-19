const express = require("express");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const imageRouter = require("./router/imageRouter");
const categoryRouter = require("./router/categoryRouter");
const orderRouter = require("./router/orderRouter");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
require("./config/cloudinary");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(errorHandler);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/image", imageRouter);
app.use("/api/category", categoryRouter);
app.use("/api/orders", orderRouter);

app.listen(8000, async () => {
  connectDB().then(() => {});
  console.log("Server is listening");
});
