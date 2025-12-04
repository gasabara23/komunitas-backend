import Comment from "../models/Comment.js";
export const addComment = async(req, res) => {
    try {
        const { username, text, avatar, parentId, badge } = req.body;
        if (!text) return res.status(400).json({ error: 'text required' });
        const comment = await Comment.create({ username, text, avatar, parentId: parentId || null, badge });
        res.json({ ok: true, comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Create comment failed' });
    }
};
export const getComments = async(req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json({ ok: true, comments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Get comments failed' });
    }
};