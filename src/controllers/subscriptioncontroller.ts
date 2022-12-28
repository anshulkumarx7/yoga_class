import { NextFunction, Response, Request } from "express";
import { prisma } from "../app";
import { Prisma } from "@prisma/client";
import APIerror from "../error/APIerror";
import { Batch } from "@prisma/client";

export const createSubscription = async(req:Request,res:Response,next:NextFunction)=>{
    const paymentData=req.body;
    // const {batchId}=req.body;
    console.log("rr");
    try{
        await prisma.subscription.create({
            data:paymentData,
        }).catch(err=>{
            console.log("await",err);
        })
        console.log("oo");
        res.status(200).json({
            message:"Subscription created Successfully",
        })
    }
    catch(error:any){
        // console.log(error);
        // res.json(error);
        if(error.code === "P2002"){
            next(APIerror.badRequest("Unique Constraint Failed"));
        }
        else{
            next(APIerror.internalServerError("Something Went error"));
        }
        // if (error instanceof Prisma.PrismaClientKnownRequestError) {
        //     // The .code property can be accessed in a type-safe manner
        //     if (error.code === 'P2002') {
        //         console.log(
        //           'There is a unique constraint violation, a new user cannot be created with this email')
        //         next(APIerror.badRequest("Unique Constraint Failed"));  
        //     }
        // }
        // else{
        //     next(APIerror.badRequest("Something Went Wrong"));
        // }
        
    }

}

export const getSubscriptiondetails =async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const id = String(req.params.id);
    const paymentData = await prisma.subscription.findUnique({
        where : {
            userId:id,
        }
    });
    res.status(200).json({
        message :"Payment Found",
        payment:paymentData,
    })
    }
    catch(error){
        console.log(error);
        next(APIerror.badRequest(" Payment Not Found "));
    }
}

export const getAllSubscription =async(req:Request,res:Response,next:NextFunction)=>{
    const paymentData = await prisma.subscription.findMany();
    res.status(200).json({
        payment:paymentData,
    })
}

export const updateSubscriptionDetails = async (req:Request,res:Response,next:NextFunction)=>{
    const id = String(req.params.id);
    const updatedPaymentData=req.body;
    try{
        const payment = await prisma.subscription.update({
            where :{
                id:id,
            },
            data:updatedPaymentData,
        });
    }
    catch(error){
        console.log(error);
        next(APIerror.badRequest("Something Went Wrong"));
    }
}    

export const deleteSubscription = async(req:Request,res:Response,next:NextFunction)=>{
    const id= String(req.params.id);
    try{
        const subscription =await prisma.subscription.findUnique({
            where: {
                id:id,
            }
        });
        const userId=subscription?.userId;
        const batchId=subscription?.batchId;
        const payment = await prisma.subscription.delete({
            where:{
                id:id,
            }
        });
        await prisma.user.update({
            where:{
                id:userId,
            },
            data:{
                batchId:null,
            }

        });
        const batch = await prisma.batch.findUnique({
            where:{
                id:batchId,
            }
        });
        const { currentCapacity }=batch as Batch;
        await prisma.batch.update({
            where:{
                id:batchId,
            },
            data:{
                currentCapacity:currentCapacity-1,
            }
        })
        res.status(200).json({
            message:"Subscription deleted Successfully",
            payment:payment,
        })
    }
    catch(error){
        console.log(error);
        next(APIerror.badRequest("Something went wrong"));
    }
}

export const deleteallSubscription = async (req:Request,res:Response,next:NextFunction)=>{
    const deletedData =await prisma.subscription.deleteMany();
    res.json(deletedData);
}