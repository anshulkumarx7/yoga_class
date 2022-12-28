import { Request,Response,NextFunction } from "express";
import APIerror from "../error/APIerror";
import { Prisma } from "@prisma/client";
import { Batch } from "@prisma/client";
import { prisma } from "../app";


const makePayment = async(req:Request,res:Response,next:NextFunction)=>{
    const { price }= req.body;
    if(!price){
        next(APIerror.internalServerError("Failed to set price"));
    }
    const { batchId } = req.body;
    const batch = await prisma.batch.findUnique({
        where :{
            id:batchId,
        }
    });

    //dummy payment!!!! done
    const { currentCapacity } =batch as Batch;
    await prisma.batch.update({
        where:{
            id:batchId,
        },
        data:{
            currentCapacity:currentCapacity+1,
        }
    });
    const { userId }=req.body;
    await prisma.user.update({
        where:{
            id:userId,
        },
        data:{
            batchId:batchId,
        }
    }).catch(error=>{
        console.log('Error',error);
        next(APIerror.internalServerError("Failed to set user with batch id"));
    });
    req.body['isActive']=true;
    // req.body['userId']=userId;

    // res.json({
    //     message:"It runs successfully!!"
    // });
    next();
}

export default makePayment;