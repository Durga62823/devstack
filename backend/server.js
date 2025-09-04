const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const roomAllocationRoutes = require('./routes/roomAllocation');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://psivadurgaprasad88_db_user:NL9x4y2mrCrV32Ce@devstack.f2h4tj2.mongodb.net/?retryWrites=true&w=majority&appName=Devstack");
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);  // Exit process with failure
    }
  };
// MongoDB connection
connectDB()

// Routes
app.use('/api/room-allocations', roomAllocationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});