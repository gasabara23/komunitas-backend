import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Unauthorized' });
    const token = auth.split(' ')[1];
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};