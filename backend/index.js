import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config({
    //give path of env file
})


// Error handler for the Express app
app.on("error", (error) => {
    console.error("Express app error:", error);
    process.exit(1); // Exit with failure
});

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


