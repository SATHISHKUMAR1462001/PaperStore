import express from "express";
import { roleBasedAccess, verifyUser } from "../helpers/userAuth.js";
import { newOrder,grtOrderDetails,getOrderHistory,getDeleteOrderByAdmine,getAllOrderByAdmnine,upDateOrderStatus } from "../controller/orderControler.js";


const router=express.Router();

router.route("/new/order").post(verifyUser,newOrder)
router.route("/orderDetail/:id").get(verifyUser,grtOrderDetails)
router.route("/orderhistory/user").get(verifyUser,getOrderHistory)
router.route("/AllOrder/admine").get(verifyUser,roleBasedAccess("admin"),getAllOrderByAdmnine)
router.route("/delete/admine/:id").delete(verifyUser,roleBasedAccess("admin"),getDeleteOrderByAdmine).put(verifyUser,roleBasedAccess('admin'),upDateOrderStatus)

export default router;