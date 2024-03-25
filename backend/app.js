import express from "express";
import mongoose from "mongoose";
import cors from "cors"

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials:true
    }
))

//handling different types of data coming
app.use(express.json({limit:"16kb"}))
//middlewares


///routes import and usage
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
//authroutes
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


export {app}