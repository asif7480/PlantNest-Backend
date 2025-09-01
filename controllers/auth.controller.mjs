import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.mjs";

const register = asyncHandler( async(request, response) => {
    const {username, email, password, role, age, city, avatar} = request.body

    if(!username || !email || !password || !age || !city){
        response.status(400)
        throw new Error("Input all fields.")
    }

    const userExists = await User.findOne({ email })
    if(userExists){
        response.status(401)
        throw new Error("User already registered.")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ username, email, password: hashPassword, role, age, city, avatar })

    response.status(201).json({ message: `User created.`, success: true, user })
})

const login = asyncHandler( async(request, response) => {

})

export {
    register
}