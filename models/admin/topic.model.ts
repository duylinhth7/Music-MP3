import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const topicsSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
    status: String,
    featured: String,
    position: Number,
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true });
const Topics = mongoose.model("Topics", topicsSchema, "topics");

export default Topics;  