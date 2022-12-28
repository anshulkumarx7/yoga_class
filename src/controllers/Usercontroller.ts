import { NextFunction, Response, Request } from "express";
import { prisma } from "../app";
import { Prisma } from "@prisma/client";
import APIerror from "../error/APIerror";
export const createUser = async (req: Request, res: Response, next: NextFunction) =>{
    const userData = req.body;
    try {
        await prisma.user.create({
            data: userData,
        });
        res.status(201).json({
            message: "User created Successfully",
            user: userData,
        });
    }
    catch (error) {
        console.log(error);
        next(APIerror.internalServerError("Something went Wrong"));
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = String(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id:userId,
            }
        });
        res.status(200).json({
            message: "User Found",
            user: user,
        });
    }
    catch (error) {
        next(APIerror.badRequest("User Not Found"))
    }

}
export const getallUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findMany();
    res.json(user);
}
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = String(req.params.id);
    const updatedData = req.body;
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data:updatedData,
    });
    res.json({
        message: "User data updated Successfully",
        user: user,
    });
};
export const deleteUser =async(req:Request,res:Response,next:NextFunction)=>{
    const userId =String(req.params.id);
    const user =await prisma.user.delete({
        where : {
            id:userId
        }
    });
    res.json({
        message:"User Deleted Successfully",
        user:user,
    })
}

