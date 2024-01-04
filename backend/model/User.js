import  mongoose from 'mongoose';
import Joi from 'joi';

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    token:{
        type:String,
       
    }

    
});
const validation = function validateUser(user) {
    const schema =Joi.object( {
        name:Joi.string().min(5).max(50).required().label("name"),
        email:Joi.string().min(5).max(255).required().label("email"),
        password:Joi.string().min(5).max(1024).required().label("password")
    });
    return schema.validate(user);
}



const User=new mongoose.model("User",UserSchema);
export {User,validation}