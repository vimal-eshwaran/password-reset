import {User,validation} from '../model/User.js';
import bcrypt from 'bcrypt'


 const Signup = async(req,res)=>{
    
    try{
        const { error } = validation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
        // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      return res.status(400).send('That user already exisits!');}

        const {password}=req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser= await new User({ ...req.body, password: hashedPassword }).save();
    
    res.status(201).json({
        status:'success',
        message:"new user created"
    });
    }catch(err){
        console.log("error in creating new user",err);
        res.status(404).send("Error ocuured while registration");
    }
}
export {Signup}