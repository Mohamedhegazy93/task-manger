const { CustomError } = require("../errors/customErrors");
const errorHandller = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "something went wrong" });
};

module.exports = errorHandller;
