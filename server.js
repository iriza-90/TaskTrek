require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');
const Task = require('./models/tasks');

const app = express();

// Database connection
const connectDB = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(process.env.DB, connectionParams); // Await mongoose connection
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Could not connect to the database!', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};




connectDB();


// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/tasks",tasksRoute);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
