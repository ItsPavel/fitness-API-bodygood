const workoutService = require("../services/workoutService");
const errorHandler = require("../errors/index");

const getAllWorkouts = (req, res) => {
  try {
    const queryParams = req.query;

    const { allWorkouts, page, limit } =
      workoutService.getAllWorkouts(queryParams);
    res.send({ status: "OK", data: allWorkouts, page, limit });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getOneWorkout = (req, res) => {
  const workoutId = req.params.workoutId;
  if (!workoutId) {
    res.status(400).send({
      status: "ОШИБКА",
      data: {
        error: "Параметор 'workoutId' не должен быть пустым",
      },
    });
  }
  try {
    const oneWorkout = workoutService.getOneWorkout(workoutId);
    res.send({ status: "OK", data: oneWorkout });
  } catch (error) {
    errorHandler(res, error);
  }
};

const createNewWorkout = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "ОШИБКА",
      error: `В теле запроса отсутствуют один или несколько из следующих ключей: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'`,
    });
    return;
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdNewWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({
      status: "OK",
      data: createdNewWorkout,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateOneWorkout = (req, res) => {
  const workoutId = req.params.workoutId;
  if (!workoutId) {
    res.status(400).send({
      status: "ОШИБКА",
      data: {
        error: "Параметор 'workoutId' не должен быть пустым",
      },
    });
  }
  try {
    const updateWorkout = workoutService.updateOneWorkout(workoutId, req.body);
    res.send({ status: "OK", date: updateWorkout });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteOneWorkout = (req, res) => {
  const workoutId = req.params.workoutId;
  if (!workoutId) {
    res.status(400).send({
      status: "ОШИБКА",
      data: {
        error: "Параметор 'workoutId' не должен быть пустым",
      },
    });
  }
  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
