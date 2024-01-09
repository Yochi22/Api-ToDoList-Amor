// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://yochilm:Marcador22@cluster0.ohwoqwa.mongodb.net/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Rutas de la API
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});