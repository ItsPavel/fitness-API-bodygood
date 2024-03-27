const authService = require("../services/authService");
const errorHandler = require("..//errors/index");
const { validationResult } = require("express-validator");

const registrationUser = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ message: "Ошибка валидации пользователя" });
    }
    const { username, password } = req.body;
    authService.createNewUser(username, password);
    res.status(201).send({
      status: "OK",
      data: {
        message: "Пользователь успешно зарегистрирован",
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
    const userInfo = authService.getUserInfo(username, password);
    res.status(201).send({
      status: "OK",
      data: userInfo,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  registrationUser,
  loginUser,
};
