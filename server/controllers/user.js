import User from "../models/User.js";


//FUNCTINO THAT LET USER CREATE NEW ACCCOUNT
export const signUp = async (req ,res)=>{
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json(newUser);
    }catch(err){
        console.log(err);
    }
};


//FUNCTINO THAT LET USER LOGIN TO ACCCOUNT
export const login = async (req ,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});

        if(!user){
            res.status(404).json("username incorrect!");
            return ;
        }

        if(user.password === req.body.password){
            res.status(200).json(user);
            return;
        }

        res.status(403).json("incorrect password!");


    }catch(err){
        console.log(err);
    }
};