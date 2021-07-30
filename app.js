require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const db = require("./config/database");
const route = require("./routes");

db();

app.use(express.json());

route(app);

app.get("/", (req, res) => {
  res.send("Hello");
});

console.log(process.env.NODE_ENV);

app.listen(5000, () => {
  console.log(
    `Server is listening port: ${5000} with route http://localhost:${5000}`
  );
});
