const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers?.authorization?.replace("Bearer ", "");
    const jwtVerification = jsonwebtoken.verify(
      accessToken,
      process.env.jwt_secret
    );

    req.accessToken = jwtVerification;
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
    return;
  }

  next();
};

module.exports = auth;
