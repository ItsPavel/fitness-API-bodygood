const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.auth;
    console.log(token);
    if (!token) {
      return res
        .status(403)
        .send({ message: "Пользователь не зарегистрирован" });
    }
    const decodedData = jwt.verify(token, secretKey);
    if (decodedData.role !== "admin") {
      return res
        .status(403)
        .send({ message: "Пользователь не является администратором" });
    }
    next();
  } catch (error) {
    return res
      .status(403)
      .send({ message: "Пользователь не является администратором" });
  }
};
