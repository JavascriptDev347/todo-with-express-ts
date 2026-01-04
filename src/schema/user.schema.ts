import mongoose, { Schema, Types } from "mongoose";
import { Role } from "../types/enum/role.enum.ts";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Role,
        default: Role.USER,
    },
    profilePicture: {
        type: String
    },
    todos: [
        {
            type: Types.ObjectId,
            ref: "Todo",
        }
    ]
}, { timestamps: true });

export default mongoose.model('User', userSchema);