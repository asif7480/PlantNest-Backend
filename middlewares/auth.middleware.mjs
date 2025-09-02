import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/user.model.mjs"


const verifyToken = asyncHandler( async(request, response, next) => {
    const token = request.cookies.token

    if(!token){
        return response.status(401).json({
            message: "Token not provided.",
            success: false
        })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    request.user = await User.findById(decoded._id)
    next()
})

export default verifyToken

// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../models/user.model.mjs";

// const verifyToken = asyncHandler(async (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Token not provided.",
//             success: false
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         console.log(decoded);

//         const user = await User.findById(decoded._id);
//         if (!user) {
//             return res.status(401).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         req.user = user;
//         next();

//     } catch (error) {
//         return res.status(401).json({
//             message: "Invalid or expired token.",
//             success: false
//         });
//     }
// });

// export default verifyToken;
