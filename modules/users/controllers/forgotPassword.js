const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  //   const forgotPasswordModel = mongoose.model("forgotPassword");

  const { email } = req.body;

  if (!email) throw "Email is required!";

  const getUser = await usersModel.findOne({ email });

  if (!getUser) throw "User not found!";

  const resetCode = Math.floor(100000 + Math.random() * 900000);

  await usersModel.updateOne(
    { email },
    { reset_code: resetCode },
    { runValidators: true }
  );

  //   var transport = nodemailer.createTransport({
  //     host: "sandbox.smtp.mailtrap.io",
  //     port: 2525,
  //     auth: {
  //       user: "b6c5ba34c4eddf",
  //       pass: "3677d2101b12d1",
  //     },
  //   });

  //   transport.sendMail({
  //     to: email,
  //     from: "info@expensetracker.com",
  //     text: `Your password reset code is ${resetCode}`,
  //     html: `Your password reset code is ${resetCode}`,
  //     subject: c,
  //   });

  await emailManager(
    email,
    `Your password reset code is ${resetCode}`,
    `Your password reset code is <b>${resetCode}</b>`,
    "Reset your password - Expense tracker PRO"
  );

  res.status(200).json({
    status: "success",
    message: "Reset code sent successful!y",
  });
};

module.exports = forgotPassword;
