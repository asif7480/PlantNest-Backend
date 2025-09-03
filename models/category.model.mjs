import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        category: { 
            type: String, 
            required: true,
            enum: ["flowering", "non-flowering", "indoor", "outdoor", "succulents", "medicinal"],
            lowercase: true,
            trim: true
        }
    },
    { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema)
export default Category