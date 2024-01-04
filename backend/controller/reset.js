import {User} from '../model/User.js';
import bcrypt from 'bcrypt'


const reset = async(req,res)=>{

  try {
     const { token } = req.params;
     const { password } = req.body;
     
 // Finding the user  token
  const user = await User.findOne({ token:token });

  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  // Update the user's password and delete token
  user.token = undefined;
  const hashedPassword = await bcrypt.hash(password,10);
  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({ message: "Password reset successfully" });
    
  } catch (error) {
    
    res.status(403).json({message:"unauthorised"});
    console.log(error)
  }



}


export {reset}
