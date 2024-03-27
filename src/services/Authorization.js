const {
  hashPassword,
  saveToDatabase,
  validPassword,
  generateAccessToken,
} = require("../utils/index");
const { v4: uuidv4 } = require("uuid");

const PATH = "./src/database/usersdb.json";
const USERS = require("../database/usersdb.json");

const createNewUser = (username, password) => {
  try {
    const hasUser =
      USERS.users.findIndex((user) => user.username === username) > -1;
    if (hasUser) {
      throw {
        status: 400,
        message: `Пользователь с username: '${username}' уже существует`,
      };
    }
    const neWuser = {
      id: uuidv4(),
      username,
      password: hashPassword(password),
      role: "user",
      createdAt: new Date().toLocaleString("RU-ru"),
    };
    USERS.users.push(neWuser);
    saveToDatabase(USERS, PATH);
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
};

const getUserInfo = (username, password) => {
  try {
    const user = USERS.users.find((user) => user.username === username);
    if (!user) {
      throw {
        status: 400,
        message: `Пользователь с username: '${username}' не найден`,
      };
    }
    let isCorrectPassword = validPassword(password, user.password);
    if (!isCorrectPassword) {
      throw {
        status: 400,
        message: `Неверный пароль`,
      };
    }
    const token = generateAccessToken(user.id, user.role);
    return { accessToken: token };
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
};

module.exports = { createNewUser, getUserInfo };
