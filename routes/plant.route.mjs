import express from "express"
import verifyToken from "../middlewares/auth.middleware.mjs"
import { addPlant, deletePlant, getAllPlants, updatePlant } from "../controllers/plant.controller.mjs"

const plantRouter = express.Router()

plantRouter.get(`/`, getAllPlants)
plantRouter.post(`/`, verifyToken, addPlant)
plantRouter.put(`/:id`, verifyToken, updatePlant)
plantRouter.delete(`/:id`, verifyToken, deletePlant)

export default plantRouter