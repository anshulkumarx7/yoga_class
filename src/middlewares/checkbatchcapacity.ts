import { Request,Response,NextFunction } from "express";
import APIerror from "../error/APIerror";
import { Prisma } from "@prisma/client";
import { Batch } from "@prisma/client";
import { prisma } from "../app";

const checkbatchcapacity =async(req:Request,res:Response,next:NextFunction)=>{
    const {batchId}=req.body;
    if(!batchId){
        next(APIerror.badRequest("BatchId required"));
    }
    const batch = await prisma.batch.findUnique({
        where:{
            id:batchId,
        }
    });
    console.log("Batch",batch);
    const { maxCapacity, currentCapacity,price  } = batch as Batch;
    if (currentCapacity + 1 > maxCapacity) {
        next(APIerror.badRequest('Batch is full'));
    }
    req.body['price']=price;
    next();
}
export default checkbatchcapacity;