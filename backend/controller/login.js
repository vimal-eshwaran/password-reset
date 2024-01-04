import { User } from "../model/User.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const login=async(req,res)=>{

    try {
        const {email,password}=req.body;

        let user= await User.findOne({email:email});

        if (!user) {
            return res.status(401).json({ message: "Email not registered" });
          }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Wrong Password" });
          }
        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
        
          res.status(200).json({ token });
        
    } catch (error) {
        console.log("Error in  login",error);
        res.status(404).send("The Error occured while login")
    }


}
export {login}