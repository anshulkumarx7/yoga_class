import { NextFunction } from "express";
import APIerror from "./APIerror";

function errorHandler(err:any,req:any,res:any,next:any){
    if(err instanceof APIerror){
        res.status(err.code).message({message :err.message});
        return;
    }
    res.status(500).json({
        message: "something went wrong to the server"
    });
    


}


export default errorHandler;