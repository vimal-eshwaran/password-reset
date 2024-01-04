import express from 'express';
import {reset} from '../controller/reset.js'

const router=express.Router();

router.route('/resetPassword/:token').post(reset);


export {router as reset}