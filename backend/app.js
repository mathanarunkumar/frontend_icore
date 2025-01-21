const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors =require('cors')

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Import routes

const regroute = require("./routes/register-route")
const userroute = require("./routes/user-routes")

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

// Use routes
app.use('/api/v1/', regroute);
app.use('/api/v1/', userroute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

// Connect to MongoDB
const connectMongoDb = require('./config/connectDatabase');
connectMongoDb();
