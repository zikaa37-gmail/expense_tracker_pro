const errorHandler = async (error, req, res, next) => {
  if (error) {
    console.error(error);
    const err = error.message ? error.message : error;
    res.status(400).json({
      status: "failed",
      error: err,
    });
    return;
  } else {
    console.log("next");
    next();
  }
};

module.exports = errorHandler;
