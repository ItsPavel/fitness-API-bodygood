const Auth = require("./Authorization");

const createNewUser = (username, password) => {
  try {
    Auth.createNewUser(username, password);
  } catch (error) {
    throw error;
  }
};

const getUserInfo = (username, password) => {
  try {
    const user = Auth.getUserInfo(username, password);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser, getUserInfo };
