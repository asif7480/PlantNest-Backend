import asyncHandler from "express-async-handler";
import Plant from "../models/plant.model.mjs";
import Category from "../models/category.model.mjs";

const getAllPlants = asyncHandler( async(request, response) => {
    const plants = await Plant.find().populate("category", "category")

    return response.status(200).json({ plants })
})

const addPlant = asyncHandler( async(request, response) => {
    const { name, price, category } = request.body

    if(!name || !price || !category){
        return response.status(400).json({
            message: "Input all fields.",
            success: false
        })
    }

    const newPlant = await Plant.create({ name, price, category })
    response.status(201).json({
        message: "New plant added",
        success: true,
        plant: newPlant
    })
})

const updatePlant = asyncHandler( async(request, response) => {
    const plant = await Plant.findById(request.params.id)

    if(!plant){
        return response.status(404).json({
            message: `Plant not found.`,
            success: false
        })
    }

    const updatedPlant = await Plant.findByIdAndUpdate(request.params.id, request.body, { new: true })

    // plant.name = request.body.name
    // plant.price = request.body.price
    // plant.category = request.body.category

    await plant.save()

    response.status(200).json({
        message: "Plant updated successfully",
        success: true,
        plant: updatedPlant
    })
})

const deletePlant = asyncHandler( async(request, response) => {

    const plant = await Plant.findById(request.params.id)

    if(!plant){
        return response.status(404).json({
            message: `Plant not found.`,
            success: false
        })
    }

    await Plant.findByIdAndDelete(request.params.id)

    response.status(200).json({
        message: `Plant deleted successfully.`,
        success: true
    })
})

export {
    getAllPlants,
    addPlant,
    deletePlant,
    updatePlant
}