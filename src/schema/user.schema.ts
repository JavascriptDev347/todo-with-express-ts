import mongoose, {Schema,Types} from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    todos:[
        {
            type:Types.ObjectId,
            ref:"Todo",
        }
    ]
},{timestamps:true});

export default mongoose.model('User', userSchema);