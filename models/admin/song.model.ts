import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);
const songSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: Array,
    lyrics: String,
    view: {
        type: Number,
        default: 0
    },
    audio: String,
    status: String,
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    position: Number,
    featured: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true });
const Song = mongoose.model("Song", songSchema, "song");

export default Song; 
