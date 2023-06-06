const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
const { TutorialRoutes } = require("./routes/tutorial.routes");
const { connection } = require("./config/db.config");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tutorials", TutorialRoutes);

// simple route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log("error while connecting", error.message);
  }
  console.log(`Server is running on port ${PORT}.`);
});
