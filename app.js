const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes); 

module.exports = app;
