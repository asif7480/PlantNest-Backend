import express from "express"
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller.mjs"
import verifyToken from "../middlewares/auth.middleware.mjs"
import checkRole from "../middlewares/role.middleware.mjs"

const categoryRouter = express.Router()

categoryRouter.get(`/`, getAllCategories)
categoryRouter.post(`/`, verifyToken, checkRole("admin"), addCategory)
categoryRouter.put(`/:id`, verifyToken, checkRole("admin"),  updateCategory)
categoryRouter.delete(`/:id`, verifyToken, checkRole("admin"),  deleteCategory)

export default categoryRouter