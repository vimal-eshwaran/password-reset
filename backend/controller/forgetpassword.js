import {User} from '../model/User.js';
import crypto from 'crypto'
import {sendMail} from '../service/sendMail.js'

const forgetPassword=async(req,res)=>{

    try {
    const {email}=req.body;
    let user = await User.findOne({email:email});
     if(!user){
         res.status(404).json({message:"user not found"});
     }
      // Generate a random token
  const token = crypto.randomBytes(25).toString("hex");

  // Store the token in the database
  user.token = token;
  await user.save();
     sendMail(email,"password-reset",`Click the below Link to reset Password
     
     https://jocular-sopapillas-e0369f.netlify.app/Reset/${token}`)
     res.status(200).json({message:`The password reset mail send to ${email}`})
        
    } catch (error) {
       
        console.log("User email not found",error);
        res.status(404).send(error);
        
    }
}
export {forgetPassword}
