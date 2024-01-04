import express from 'express';
import {forgetPassword} from '../controller/forgetpassword.js' 


const router=express.Router();

router.route('/forgetPassword').post(forgetPassword);


export {router as forget}