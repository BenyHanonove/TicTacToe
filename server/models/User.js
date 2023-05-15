import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        uniqe:true,
    },
    password:{
        type:String,
        require:true,
    }
},

    {timestamps:true},

);

export default mongoose.model("XOusers",userSchema);