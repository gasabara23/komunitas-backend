import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const registerUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'username & password required' });
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ error: 'Username sudah dipakai' });
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });
        res.json({ ok: true, user: { id: user._id, username: user.username, avatar: user.avatar } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Register gagal' });
    }
};
export const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'username & password required' });
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User tidak ditemukan' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Password salah' });
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);
        res.json({ ok: true, token, user: { id: user._id, username: user.username, avatar: user.avatar, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login gagal' });
    }
};