import mongoose, {Schema, Types} from "mongoose";

const todoSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
    },
    author:{
        type:Types.ObjectId,
        ref:"User",
    }
},{timestamps:true});

export default mongoose.model("Todo",todoSchema);