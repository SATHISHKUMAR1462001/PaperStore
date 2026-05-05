import Order from "../models/orderModel.js"
import HandleError from "../helpers/HandelError.js";
import Product from "../models/productModel.js";

export const newOrder=async(req,res,next)=>{

    const {shippingAddress,orderItems,orderStatus,paymentInfo}=req.body;
    const order=await Order.create({
        shippingAddress,
        orderItems,
        orderStatus,
        user:req.user._id,
        paymentInfo

    });
    res.status(201).json({
        success:true,
        order
    })

}
export const grtOrderDetails=async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new HandleError("Order Noot found",400))
    }
    res.status(200).json({
        success:true,
        order
    })
}


export const getOrderHistory=async (req,res,next) => {
    const ordershistory=await Order.find({user:req.user._id}).populate("user","name email")
    if(!ordershistory){
         return next(new HandleError("Order Noot found",400))
    }
    res.status(200).json({
        success:true,
        ordershistory
    })
    
}

export const getDeleteOrderByAdmine=async (req,res,next) => {

    console.log(req.params.id)
    const order=await Order.findById(req.params.id);
    

    if(!order){
         return next(new HandleError("Order Noot found",400));
    }
    if(order.orderStatus!=="Delevered"){
         return next(new HandleError("canot d",400));
    }
    await Order.deleteOne({_id:req.params.id})
    res.status(200).json({
        success:true,
        deleteOrderByAdmine
    })
    
}


export const getAllOrderByAdmnine=async (req,res,next) => {
    const AllOrderByAdmnine=await Order.find()
    //console.log(AllOrderByAdmnine)

    if(!AllOrderByAdmnine){
         return next(new HandleError("getDeleteOrderByAdmine Noot found",400));
    }
    res.status(200).json({
        success:true,
        AllOrderByAdmnine
    })
    
}


export const upDateOrderStatus=async (req,res,next) => {
const id=req.params.id
    const updataStatus=await Order.findById(id)
   //console.log(updataStatus)

    if(!updataStatus){
         return next(new HandleError("getDeleteOrderByAdmine Noot found",400));
    }
    if(updataStatus.orderStatus=="Delevered"){
       
         return next(new HandleError("updataStatus exested",400));
    }
    await Promise.all(updataStatus.orderItems.map((items)=>updateQuentity(items.quantity,items.product)))
   updataStatus.orderStatus=req.body.status;
    await updataStatus.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        updataStatus
    })

    async function updateQuentity(quantity,id){
        const product=await Product.findById(id)
        console.log(product);
         if(!product){
         return next(new HandleError("getDeleteOrderByAdmine Noot found",400))
    }
    product.stock-=quantity;
    await product.save({validateBeforeSave:false})
    
}
    
}

