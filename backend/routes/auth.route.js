import express from "express"
const router = express.Router()

//import the functions
import { signup } from "../controllers/auth.controller.js"


router.post('/signup',signup)


export default router