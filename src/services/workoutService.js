const Workout = require("./Workout");
const { v4: uuidv4 } = require("uuid");

const getAllWorkouts = (queryParams) => {
  try {
    const arrkey = Object.keys(queryParams);
    if (!arrkey.includes("page")) {
      queryParams.page = 1;
    }
    if (!arrkey.includes("limit")) {
      queryParams.limit = 6;
    }
    const allWorkouts = Workout.getAllWorkouts(queryParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = Workout.getOneWorkout(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuidv4(),
    createdAt: new Date().toLocaleString("RU-ru"),
    updatedAt: new Date().toLocaleString("RU-ru"),
  };
  try {
    const createdWorkout = Workout.createdNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutId, body) => {
  try {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, body);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    Workout.deleteOneWorkout(workoutId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
