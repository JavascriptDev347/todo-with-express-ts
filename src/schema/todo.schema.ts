import mongoose, {Schema} from "mongoose";

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
    }
},{timestamps:true});

export default mongoose.model("TodoSchema",todoSchema);