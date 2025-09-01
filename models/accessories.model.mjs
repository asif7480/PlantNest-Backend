import mongoose from "mongoose";

const accessory = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category"},
        images: [String],
        description: { type: String, required: true }
    },
    { timestamps: true }
)

const Accessory = mongoose.model("Accessory", accessory)
export default Accessory