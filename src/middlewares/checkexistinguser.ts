import { Request,Response,NextFunction } from "express";
import APIerror from "../error/APIerror";
import { Prisma } from "@prisma/client";
import { prisma } from "../app";

const checkUser = async(req:Request,res:Response,next:NextFunction)=>{
    const {userId} =req.body;
    if(!userId){
        next(APIerror.badRequest("UserId Required"));
    }
    next();

}
export default checkUser;