import type {Response, NextFunction, Request} from "express";
import jwt from "jsonwebtoken"


export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ success: false, message: "No token found" });
        return;
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
        if (err) {
            res.status(403).json({ success: false, message: "Invalid token" });
            return;
        }
        req.user = user;
        next();
    });
}