require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
