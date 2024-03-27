import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        if (existingUser.username === username) {
            return res.status(400).json(new ApiResponse(400, null, "Username already exists"));
        } else {
            return res.status(400).json(new ApiResponse(400, null, "Email already exists, please use a different one."));
        }
    }

    // Create a new user instance using Mongoose's create method
    const createdUser = await User.create({
        username,
        email,
        password
    });

    // Return user without password
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User creation successful"));
});

const signin = asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    if (!password || !email ) {
        res.status(400).json( new ApiResponse(400,{},"All fields are required"))
        // throw new ApiError(400, "All fields are required");
    }

    try {
        const validUser = await User.findOne({email})

        if(!validUser){
            return res.status(400).json(new ApiResponse(400, null, "User not found"));
        }

        const validPassword = await validUser.isPasswordCorrect(password)

        if(!validPassword){
            return res.status(400).json(new ApiResponse(401, null, "Please Enter Valid Password"));
        }

        const accessToken = jwt.sign(
            {id:validUser._id},
            process.env.JWT_SECRET     
        )
        // we are wasting database call here for secure user instead we can do something else
        // const secureUser = await User.findOne({email}).select("-password")
        //other way is

        //basically we seperate password and rest of the details here

        const {password:pass , ...secureUser} = validUser._doc
        res
        .status(200)
        .cookie('accessToken',accessToken,{
            httpOnly:true
        })
        .json(
            new ApiResponse(200,secureUser,"login successfull")
        )



        
        
    } catch (error) {
        res
        .status(400)
        .json( new ApiResponse(400,{},`Login failed ${error.message}`))
        
    }


})

export { signup ,signin};
