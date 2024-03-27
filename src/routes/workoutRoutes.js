const express = require("express");
const {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
} = require("../controllers/workoutController");
const authRolemw = require("../middleware/authRolemw");

const router = express.Router();

router.get("/", getAllWorkouts);
router.get("/:workoutId", getOneWorkout);
router.post("/", authRolemw, createNewWorkout);
router.patch("/:workoutId", updateOneWorkout);
router.delete("/:workoutId", deleteOneWorkout);

module.exports = router;
