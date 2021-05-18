const express = require("express");
const app = express();
const port = 3000;
const users = require("./controllers/user");

app.use("/user", users);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log("listening ke port 3000");
});
