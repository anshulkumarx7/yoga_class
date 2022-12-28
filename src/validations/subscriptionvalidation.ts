import { Request,Response,NextFunction } from "express";
import APIerror from "../error/APIerror";
import { prisma } from "../app";

const SubscriptionValidation = async(req:Request,res:Response,next:NextFunction) =>{
    const {batchId} =req.body;
    if(!batchId){
        next(APIerror.badRequest("Batch Id Required"));
    }
    try{
    const batch = await prisma.batch.findUnique({
        where:{
            id:batchId,
        }
    });
    console.log("Batch",batch);
    }
    catch(error){
        console.log(error);
        next(APIerror.internalServerError("Something Went Wrong"));
    }
    await prisma.subscription.update()

    next();
}
export default SubscriptionValidation;
