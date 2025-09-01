import mongoose from "mongoose";

const order = mongoose.Schema(
    {
        orderNo: { type: String, required: true },
        plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
        accessory: { type: mongoose.Schema.Types.ObjectId, ref: "Accessory" }
    },
    { timestamps: true }
)

const Order = mongoose.model("Order", order)
export default Order