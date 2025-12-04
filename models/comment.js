import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    username: String,
    badge: String,
    avatar: String,
    text: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
}, { timestamps: true });
export default mongoose.model("Comment", CommentSchema);