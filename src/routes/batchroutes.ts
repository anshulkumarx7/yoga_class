import { Router } from "express";
import * as Batchcontrollers from "../controllers/Batchcontrollers";

const batchrouter =Router();

//create
batchrouter.post('/',Batchcontrollers.createbatch);
//get all
batchrouter.get('/',Batchcontrollers.getAllBatch);
//get by id
batchrouter.get('/:id',Batchcontrollers.getBatch);
//update
batchrouter.patch('/:id',Batchcontrollers.updateBatch);
//delete
batchrouter.delete('/:id',Batchcontrollers.deleteBatch);

export default batchrouter;