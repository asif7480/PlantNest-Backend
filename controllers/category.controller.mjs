import asyncHandler from "express-async-handler";
import Category from "../models/category.model.mjs";

const getAllCategories = asyncHandler( async(request, response) => {
    const categories = await Category.find()

    return response.status(200).json({ categories })
})

const addCategory = asyncHandler( async(request, response) => {
    const { category } = request.body

    if(!category){
        return response.status(400).json({
            message: "Category is required.",
            success: false
        })
    }

    const categoryExists = await Category.findOne({ category })
    if(categoryExists){
        return response.status(400).json({
            message: "Category already exists.",
            success: false
        })
    }

    const newCategory = await Category.create({ category })
    response.status(201).json({
        message: "New category added",
        success: true,
        category: newCategory
    })
})

const updateCategory = asyncHandler( async(request, response) => {
    const category = await Category.findById(request.params.id)

    if(!category){
        return response.status(404).json({
            message: `Category not found.`,
            success: false
        })
    }

    const updatedCategory = await Category.findByIdAndUpdate(request.params.id, request.body, { new: true })

    response.status(200).json({
        message: "Category updated successfully",
        success: true,
        category: updatedCategory
    })
})

const deleteCategory = asyncHandler( async(request, response) => {

    const category = await Category.findById(request.params.id)

    if(!category){
        return response.status(404).json({
            message: `Category not found.`,
            success: false
        })
    }

    await Category.findByIdAndDelete(request.params.id)

    response.status(200).json({
        message: `Category deleted successfully.`,
        success: true
    })
})

export {
    getAllCategories,
    addCategory,
    deleteCategory,
    updateCategory
}