import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String , required: true },
        role: { type: String, required: true, enum: ["admin", "user"], lowercase: true, default: "user" },
        age: { type: Number, required: true },
        city: {type: String, required: true },
        avatar: { type: String, default: null }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User