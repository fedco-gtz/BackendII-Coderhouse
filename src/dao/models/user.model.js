import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts', 
        required: true 
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel;