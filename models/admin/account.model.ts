import mongoose from 'mongoose';

const accountsSchema = new mongoose.Schema({

    fullName: String,
    email: String,
    phone: String,
    password: String,
    avatar: String,
    role_id: String,
    status: String,
    token: String,
    role: {
        type: Object,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,

}, { timestamps: true });

const Accounts = mongoose.model("Accounts", accountsSchema, "accounts");

export default Accounts;