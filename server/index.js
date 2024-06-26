// index.js
require('dotenv').config(); // Load environment variables
const taskRoutes = require('./task/taskRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(cors({
  origin: [process.env.FRONTEND_URL], // Allow these origins
  methods: ['GET', 'POST', 'PUT','DELETE'],                             // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'],           // Allow these headers
  credentials: true                                           // Allow credentials (cookies, authorization headers)
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/task', taskRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
