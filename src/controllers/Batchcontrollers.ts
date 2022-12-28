import { Request,Response,NextFunction } from "express";
import {prisma} from '../app';
import APIerror from "../error/APIerror";
import { Batch } from "@prisma/client";

export const createbatch =async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const batchdata=req.body;
    await prisma.batch.create({
        data:batchdata,
    });
    res.status(201).json({
        message: "Batch created Successfully",
        batch:batchdata,
    });
    }
    catch(error){
        console.log(error);
        next(APIerror.internalServerError("Something went Wrong"))
    }
}

export const getBatch =async(req:Request,res:Response,next:NextFunction)=>{
    const batchid=String(req.params.id);
    try{
    const batch =await prisma.batch.findUnique({
        where:{
            id:batchid,
        },
        include: {
            users: true
        },
    });
    res.status(200).json({
        message:"Batch Found",
        batch:batch,
    });
    }
    catch(error){
        console.log(error);
        next(APIerror.badRequest("Batch Not Found"));
    }
}
export const getAllBatch =async(req:Request,res:Response,next:NextFunction)=>{
    const batch =await prisma.batch.findMany({
        include: {
            _count: true,
            users: true
        },
    });
    res.json(batch);
}

export const updateBatch =async(req:Request,res:Response,next:NextFunction)=>{
    const batchid=String(req.params.id);
    const Updateddata=req.body;
    try{
    const batch = await prisma.batch.update({
        where:{
            id:batchid,
        },
        data:Updateddata,
    });
    res.json({
        message:"Batch updated Successfully",
        batch:batch,
    });
    }
    catch(error){
        console.log(error);
        next(APIerror.badRequest("Something Went Wrong"));
    }
}
export const deleteBatch = async(req:Request,res:Response,next:NextFunction)=>{
    const batchid=String(req.params.id);
    try{
    const batch =await prisma.batch.delete({
        where:{
            id:batchid,
        }
    });
    res.json({
        message:"Batch deleted successfully",
        batch:batch,
    });
    }
    catch(error){
        console.log(error);
        next(APIerror.badRequest("Something Went Wrong"));
    }
}