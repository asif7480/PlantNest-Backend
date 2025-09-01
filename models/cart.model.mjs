import mongoose from "mongoose";

const cart = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        plant: { type: mongoose.Schema.Types.ObjectId, ref: "plant" },
        accessory: { type: mongoose.Schema.Types.ObjectId, ref: "accessory" },
        status: { type: String, required: true, enum: ["pending", "checkout"], default: "pending" }
    },
    { timestamps: true }
)

const Cart = mongoose.model("Cart", cart)
export default Cart