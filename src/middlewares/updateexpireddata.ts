import { Request,Response,NextFunction } from "express";
import expiryCalculation from "../utility/getmonthend";

const updateExpiredDate =async(req:Request,res:Response,next:NextFunction)=>{
    const expiry=expiryCalculation();
    req.body['expiresAt']=expiry;
    next();
}

export default updateExpiredDate;