import { Router } from "express";
import * as Subscriptioncontroller from "../controllers/subscriptioncontroller";
import subscriptionavalidation from "../validations/subscriptionvalidation";
import checkbatchcapacity from "../middlewares/checkbatchcapacity";
import makePayment from "../middlewares/makepayment";
import checkUser from "../middlewares/checkexistinguser";
import updateExpiredDate from "../middlewares/updateexpireddata";
const subscriptionrouter =Router();

//create
subscriptionrouter.post('/',[checkUser,checkbatchcapacity,makePayment,updateExpiredDate],Subscriptioncontroller.createSubscription);
//get all
subscriptionrouter.get('/',Subscriptioncontroller.getAllSubscription);
//get by id
subscriptionrouter.get('/:id',Subscriptioncontroller.getSubscriptiondetails);
//update
subscriptionrouter.patch('/:id',Subscriptioncontroller.updateSubscriptionDetails);
//delete by id
subscriptionrouter.delete('/:id',Subscriptioncontroller.deleteSubscription);
//delete
subscriptionrouter.delete('/',Subscriptioncontroller.deleteallSubscription);


export default subscriptionrouter;