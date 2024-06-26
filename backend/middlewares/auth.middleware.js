import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
export const verifyJWT = asyncHandler( async(req,_,next)=>{

   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
 
     if(!token){
         throw new ApiError(401,"Unauthorized request")
     }
 
     const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
     const user = await  User.findById(decodedToken?._id).select(
         "-password "
     )
     if(!user){
         //some imp discussion about front end
         throw new ApiError(401,"Invalid Access Token")
     }
 
     //once everything done
     //add new object to req
 
     req.user = user
     next()
   } catch (error) {
    throw new ApiError(401 ,error?.message|| "Invalid access token")
    
   }


})