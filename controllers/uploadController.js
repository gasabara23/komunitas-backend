export const uploadAvatar = (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ ok: true, url: `/uploads/${req.file.filename}` });
};