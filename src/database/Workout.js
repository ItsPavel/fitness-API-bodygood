const DB = require("./db.json");
const { saveToDatabase } = require("./Utils");

const getAllWorkouts = () => {
  try {
    return DB.workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
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
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    return {
      status: 400,
      message: `Тренировка с именем ${newWorkout.name} уже существует`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
};

const updateOneWorkout = (workoutId, modifiedWorkout) => {
  // const isAlreadyAdded =
  //   DB.workouts.findIndex((workout) => workout.name === modifiedWorkout.name) >
  //   -1;
  // if (isAlreadyAdded) {
  //   throw {
  //     status: 400,
  //     message: `Тренеровка с именем ${modifiedWorkout.name} не найдена`,
  //   };
  // }
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );
  if (indexForUpdate === -1) {
    throw {
      status: 400,
      message: `Тренеровка с ID: '${workoutId}' не найдена`,
    };
  }
  try {
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...modifiedWorkout,
      updatedAt: new Date().toLocaleString("RU-ru"),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteOneWorkout = (workoutId) => {
  const indexForDelete = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );
  if (indexForDelete === -1) {
    throw {
      status: 400,
      message: `Тренеровка с ID: ${workoutId} не найдена`,
    };
  }
  try {
    DB.workouts.splice(indexForDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
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
