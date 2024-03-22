const express = require("express");
// const register = require("./controllers/register");
// const login = require("./controllers/login");
// const userDashboard = require("./controllers/userDashboard");
const transactionsRoutes = express.Router();
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getAllTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

// Protected routes
transactionsRoutes.use(auth);
transactionsRoutes.post("/add-income", addIncome);
transactionsRoutes.post("/add-expense", addExpense);
transactionsRoutes.get("/", getTransactions);
transactionsRoutes.delete("/:transaction_id", deleteTransaction);
transactionsRoutes.patch("/", editTransaction);

module.exports = transactionsRoutes;
