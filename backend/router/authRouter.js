
import express from 'express';
import {Signup} from '../controller/authController.js' 


const router=express.Router();

router.route('/signup').post(Signup);


export {router}
