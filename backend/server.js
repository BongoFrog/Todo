const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
const PORT = process.env.PORT || 5000;
// CORS 
app.use(cors({
    origin: process.env.FRONTEND_URI,
    method: ['GET', 'POST', 'PUT', 'DELETE']


        
    
})); 


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
