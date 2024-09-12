import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config()

import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.route.js"; 
import protectedRoute from "./middleware/protectedRoute.js";



app.use("/api/auth/", authRoutes);
app.use("/api/",protectedRoute,transactionRoutes);




app.listen(1111, (req, res) => {

  console.log("server is running at port 1111");
});
