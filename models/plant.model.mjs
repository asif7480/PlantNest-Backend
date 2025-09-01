import mongoose from "mongoose";

const plantSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category"}
    },
    { timestamps: true }
)

const Plant = mongoose.model("Plant", plantSchema)
export default Plant