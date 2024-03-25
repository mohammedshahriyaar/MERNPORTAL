import mongoose ,{Schema} from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save", async function (next) {

        if(!this.isModified("password")){
            return next()
        }
        //bcrypt takes time so use await
        this.password = await bcrypt.hash(this.password,12)
        next()
        
})


export const User = mongoose.model("User",userSchema)