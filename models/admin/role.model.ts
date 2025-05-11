import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({

    title: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    permissions : {
        type: Array,
        default: []
    },
    deletedAt: Date,

}, { timestamps: true });
const Role = mongoose.model("Role", roleSchema, "role");

export default Role;