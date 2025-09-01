import mongoose from "mongoose";

const feedback = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5 },
        plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
        accessory: { type: mongoose.Schema.Types.ObjectId, ref: "Accessory" }
    },
    { timestamps: true }
)

const Feedback = mongoose.model("Feedback", feedback)
export default Feedback