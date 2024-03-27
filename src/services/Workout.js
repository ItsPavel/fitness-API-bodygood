const { saveToDatabase } = require("../utils/index");

const WORKOUTS = require("../database/workoutsdb.json");
const PATH = "./src/database/workoutsdb.json";

const getAllWorkouts = (queryParams) => {
  try {
    const page = parseInt(queryParams.page);
    const limit = parseInt(queryParams.limit);
    if (isNaN(limit) || isNaN(page)) {
      throw {
        status: 400,
        message: `page или limit должны быть типом (Number)`,
      };
    } else if (limit <= 0 || page <= 0) {
      throw {
        status: 400,
        message: `page или limit должны быть больше 0`,
      };
    } else {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const allWorkouts = WORKOUTS.workouts.slice(startIndex, endIndex);
      return { allWorkouts, page, limit };
    }
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = WORKOUTS.workouts.find(
      (workout) => workout.id === workoutId
    );
    if (!workout) {
      throw {
        status: 400,
        message: `Тренеровка по id :'${workoutId}' не найдена`,
      };
    }
    return workout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const createdNewWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded =
      WORKOUTS.workouts.findIndex(
        (workout) => workout.name === newWorkout.name
      ) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Тренировка с именем ${newWorkout.name} уже существует`,
      };
    }
    WORKOUTS.workouts.push(newWorkout);
    saveToDatabase(WORKOUTS, PATH);
    return newWorkout;
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
};

const updateOneWorkout = (workoutId, modifiedWorkout) => {
  try {
    const indexForUpdate = WORKOUTS.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Тренеровка с ID: '${workoutId}' не найдена`,
      };
    }
    const updatedWorkout = {
      ...WORKOUTS.workouts[indexForUpdate],
      ...modifiedWorkout,
      updatedAt: new Date().toLocaleString("RU-ru"),
    };
    WORKOUTS.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(WORKOUTS, PATH);
    return updatedWorkout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDelete = WORKOUTS.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Тренеровка с ID: ${workoutId} не найдена`,
      };
    }
    WORKOUTS.workouts.splice(indexForDelete, 1);
    saveToDatabase(WORKOUTS, PATH);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createdNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
