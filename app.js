require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const process = require("process");

const { errors } = require("celebrate");

const { DB_CONNECTION_STRING, PORT } = require("./utils/config");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to DB news_explorer_db");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err.message);
    process.exit(1);
  });

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
console.log("Environment PORT:", process.env.PORT);
console.log("Configured PORT:", PORT);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
