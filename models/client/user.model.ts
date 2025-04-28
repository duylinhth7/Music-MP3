import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: String,
    avatar: String,
    favourite: [],
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true });
const User = mongoose.model("User", userSchema, "user");

export default User;  