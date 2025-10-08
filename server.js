const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// load env
dotenv.config();

// connect to mongodb
connectDB();

const app = express();

// middleware
app.use(express.json()); // parse JSON bodies

// routes
app.use('/api/students', studentRoutes);

// basic health
app.get('/', (req, res) => res.send('Student Management API is running'));

// error handler middleware (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
