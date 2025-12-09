import express from "express";
import adminAuth from "../middleware/adminAuth.js"
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay} from "../controllers/orderController.js"
import authUser from "../middleware/auth.js"
import { verifyStripe } from "../controllers/orderController.js";



const orderRouter = express.Router();


// Admin Features
orderRouter.post("/list" , adminAuth , allOrders)
orderRouter.post("/status" , adminAuth , updateStatus)

//verify payment
orderRouter.post("/verifyStripe" , authUser, verifyStripe)
orderRouter.post("/verifyRazorpay" , authUser, verifyRazorpay)

//payment features
orderRouter.post("/place" , authUser , placeOrder)
orderRouter.post("/stripe" , authUser , placeOrderStripe)
orderRouter.post("/razorpay" , authUser , placeOrderRazorpay)

//User Feature
orderRouter.post("/userorders" , authUser, userOrders)

export default orderRouter;