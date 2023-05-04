const express = require("express");
const cors = require("cors");
const app = express();
//Settings
app.set("port", process.env.PORT || 4000);

//Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

//Routes
app.use("/users", require("./Routes/Users"));
app.use("/credits", require("./Routes/Credits"))
module.exports = app;
