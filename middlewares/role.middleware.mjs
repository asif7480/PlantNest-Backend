import asyncHandler from "express-async-handler"

const checkRole = (...allowedRoles) => {
    return asyncHandler((request, response, next) => {
        const role = request.user.role

        if(!role){
            return response.status(401).json({
                message: `This role does not exists.`,
                success: false
            })
        }

        if(!allowedRoles.includes(role)){
            return response.status(401).json({
                message: `Unsufficient role. Your role is: ${role}`,

                success: false
            })
        }

        next()
    })
}

export default checkRole