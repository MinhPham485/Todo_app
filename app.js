const express = require("express");
const cors = require("cors");
const path = require("path");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use("/todos", todoRoutes); 

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
