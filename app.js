const express = require("express");

const app = express();
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/newsExplorer_db")
  .then(() => {
    console.log("Connected do DB");
  })
  .catch(console.error);
