import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

//express router import
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

//instantiate express
const app = express();

//parsing json
app.use(express.json());
//cookie parser
app.use(cookieParser());

//connection to database
// getting-started.js
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGOOSE_URL);
}

//express router
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

//page not found
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

//express error handler
app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
