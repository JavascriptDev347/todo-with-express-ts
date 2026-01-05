import mongoose, { Schema, Types } from "mongoose";
import { TodoStatus } from "../types/enum/todo-status.enum.ts";

const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category"
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: TodoStatus,
        default: TodoStatus.ACTIVE
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Todo", todoSchema);