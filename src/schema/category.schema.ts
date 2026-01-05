import mongoose, { Schema, Types } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryIcon: {
        type: String,
        default: ""
    },
    categoryColor: {
        type: String,
        default: "#000"
    },
    todos: [
        {
            type: Types.ObjectId,
            ref: "Todo"
        }
    ]
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);