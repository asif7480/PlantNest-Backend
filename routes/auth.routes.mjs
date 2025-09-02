import express from "express"
import { login, logout, profile, register } from "../controllers/auth.controller.mjs"
import verifyToken from "../middlewares/auth.middleware.mjs"

const authRouter = express.Router()

authRouter.post(`/register`, register)
authRouter.post(`/login`, login)
authRouter.post(`/logout`, logout)
authRouter.get(`/profile`, verifyToken,  profile)

export default authRouter