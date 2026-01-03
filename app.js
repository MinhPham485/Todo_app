const express = require("express");
const cors = require("cors");
const path = require("path");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes); 

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware (phải đặt cuối cùng)
app.use(errorMiddleware);

module.exports = app;
