const express = require("express");
const bodyParser = require("body-parser");
const WorkoutRouter = require("./routes/workoutRoutes");
const authRouter = require("./routes/authRoutes")

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>My API for workouts</h1>");
});

app.use(bodyParser.json());
app.use("/api/workouts", WorkoutRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`start app with port ${PORT}`);
});
