import { Request,Response,NextFunction } from "express";
import APIerror from "../error/APIerror";
import { User } from "@prisma/client";

const UserFormValidation =(req:Request,res:Response,next:NextFunction) =>{
    const userData=req.body;
    const age=userData.age;
    if(age<18 || age>65){
        next(APIerror.badRequest("Age limit is between 18-65"));
        return;
    }
    next();
}

export default UserFormValidation;