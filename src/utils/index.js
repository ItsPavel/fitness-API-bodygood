const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

// Перезаписываем базу данных
const saveToDatabase = (DB, path) => {
  fs.writeFileSync(path, JSON.stringify(DB, null, 2));
};

// Хеширование паролей
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 6);
};

//Проверка на валидность пароля
const validPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

// Генерируем токен
const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  console.log(secretKey);
  return jwt.sign(payload, secretKey, { expiresIn: "2h" });
};

module.exports = {
  saveToDatabase,
  hashPassword,
  validPassword,
  generateAccessToken,
};
