import asyncHandler from "express-async-handler";
import Category from "../models/category.model.mjs";

const getAllCategories = asyncHandler( async(request, response) => {

})

const addCategory = asyncHandler( async(request, response) => {
    const { category } = request.body

    if(!category){
        return response.status(400).json({
            message: "Category is required.",
            success: false
        })
    }

    const newCategory = await Category.create({ category })
    response.status(201).json({
        message: "New category added",
        category: newCategory
    })
})

const updateCategory = asyncHandler( async(request, response) => {

})

const deleteCategory = asyncHandler( async(request, response) => {

})

export {
    addCategory
}