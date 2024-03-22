const emailManager = require("../../../managers/emailManager");
const jwtManager = require("../../../managers/jwtManager");
const usersModel = require("../../../models/users.model");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { email, password, confirm_password, name, balance } = req.body;

  // Validations
  if (!email) throw new Error("Email is required.");
  if (!password) throw new Error("Password is required.");
  if (password.length < 3)
    throw new Error("Password must be at least 5 characters long.");
  if (!confirm_password) throw new Error("You need to confirm your password.");
  if (!name) throw new Error("Name is required.");
  if (!balance) throw new Error("Balance is required.");
  if (password !== confirm_password) throw new Error("Passwords do not match.");

  const getDuplicateEmail = await usersModel.findOne({ email: email });
  if (getDuplicateEmail) throw "Email already exists";

  const hashedPassword = await bcrypt.hashSync(password, 12);

  const createdUser = await usersModel.create({
    email,
    password: hashedPassword,
    name,
    balance,
  });

  const accessToken = jwtManager(createdUser);

  // var transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "b6c5ba34c4eddf",
  //     pass: "3677d2101b12d1",
  //   },
  // });

  // transport.sendMail({
  //   to: createdUser.email,
  //   from: "info@expensetracker.com",
  //   text: "Welcome to Expense Tracker. We hope we can manage your expenses easily from our platform.",
  //   htl: "<h1>Welcome to Expense Tracker.</h1> <br><br>We hope we can manage your expenses easily from our platform.",
  //   subject: "Welcome to Expense Tracker",
  // });

  await emailManager(
    createdUser.email,
    "Welcome to Expense Tracker. We hope we can manage your expenses easily from our platform.",
    "<h1>Welcome to Expense Tracker.</h1> <p>We hope we can manage your expenses easily from our platform.</p>",
    "Welcome to Expense Tracker"
  );

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    accessToken,
  });
};

module.exports = register;
