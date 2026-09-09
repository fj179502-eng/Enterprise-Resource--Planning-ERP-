import jwt from "jsonwebtoken";

export const generateToken=async(user)=>{
    return jwt.sign(
        {user_id:user.user_id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"15d"},
    )
}


export const refreshToken=async(user)=>{
    return jwt.sign(
        {user_id:user.user_id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"15m"},
    )
}