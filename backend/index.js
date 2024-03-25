import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
dotenv.config()
const app = express();

// mongodb connection
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to database:", mongoose.connection.db.databaseName);
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use('/api/user',userRouter)
