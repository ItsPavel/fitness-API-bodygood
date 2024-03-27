const express = require("express");
const {
  registrationUser,
  loginUser,
} = require("../controllers/authController");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/registration",
  [
    check("username").notEmpty(),
    check("password").isLength({ min: 6, max: 15 }),
  ],
  registrationUser
);
router.post("/login", loginUser);

module.exports = router;
