import express from 'express';
import {login} from '../controller/login.js'



const router=express.Router();

router.route('/login').post(login);


export {router as login}