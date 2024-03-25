import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        if (existingUser.username === username) {
            throw new ApiError(400, "Username already exists, please choose a different one.");
        } else {
            throw new ApiError(400, "Email already exists, please use a different one.");
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

export { signup };
