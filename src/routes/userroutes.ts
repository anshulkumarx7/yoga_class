import { Router } from "express";
import { appendFile } from "fs";
import * as Usercontroller from '../controllers/Usercontroller';
import UserFormValidation from "../validations/uservalidations";

const router=Router();
//create
router.post('/',UserFormValidation,Usercontroller.createUser);
//get all
router.get('/',Usercontroller.getallUser);
//get by id
router.get('/:id',Usercontroller.getUser);
//update
router.patch('/:id',UserFormValidation,Usercontroller.updateUser);
//delete
router.delete('/:id',Usercontroller.deleteUser);


export default router;