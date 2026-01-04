import type { Role } from "../types/enum/role.enum.ts";
import jwt from 'jsonwebtoken';

const generateToken = (id: string, email: string, role: Role) => {
    const token = jwt.sign({ id: id, email: email, role: role }, process.env.SECRET_KEY as string, {
        expiresIn: 8 * 60 * 60
    });

    return token;
}

export default generateToken;