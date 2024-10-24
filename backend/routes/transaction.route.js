import express from "express";

import addIncome from "../controllers/transactionControllers/income/addIncome.controllers.js";
import addExpense from "../controllers/transactionControllers/expense/addExpense.controller.js";

import getIncome from "../controllers/transactionControllers/income/getIncomes.controllers.js";
import getExpense from "../controllers/transactionControllers/expense/getExpense.controllers.js";

import editIncome from "../controllers/transactionControllers/income/editIncome.controller.js";
import editExpense from "../controllers/transactionControllers/expense/editExpense.controller.js";
import balanceRoute from "./balance.route.js";

import deleteIncome from "../controllers/transactionControllers/income/deleteIncome.controller.js";
import deleteExpense from "../controllers/transactionControllers/expense/deleteExpense.controller.js";

const route = express.Router();

route.post("/add/income", addIncome);
route.post("/add/expense", addExpense);

route.get("/get/income", getIncome);
route.get("/get/expense", getExpense);
route.get("/get/balance", balanceRoute);

route.put("/edit/income/:dataId", editIncome);
route.put("/edit/expense/:dataId", editExpense);

route.delete("/delete/income/:dataId", deleteIncome);
route.delete("/delete/expense/:dataId", deleteExpense);

export default route;
