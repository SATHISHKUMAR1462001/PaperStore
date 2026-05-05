//
import HandleError from "../helpers/HandelError.js";
import ProductSchema from "../models/productModel.js";
import myerror from '../middleware/handleAsyncError.js'
import ApiHelper from "../helpers/ApiHelper.js";

//creat product controller

//AddProduct
export const addProduct =myerror( async (req, res,next) => {
  // console.log(req.body).json();s
  const product = await ProductSchema.create(req.body);
  res.next(new HandleError("Product not added",201))
})

//get All Prodect
export const getAllProducts = async (req, res,next) => {
  console.log(req.query);
  //const getAll_Productes=await ProductSchema.find()
  const resultperpage=Number(req.query.resultperpage) || 100;
  
  const apiHelper =await new ApiHelper(ProductSchema.find(), req.query).search().filter()
  console.log("search="+apiHelper)
  //http://localhost:3000/api/v1/products?perpage=50s
  
  const filterd=apiHelper.query.clone();
  const productCount=await filterd.countDocuments(); //5
 console.log(productCount)
 
  const totelPage=Math.ceil(productCount/resultperpage);//2
  const page=Number(req.query.page) || 1;
  
  
 // console.log(filterd) 

  if(totelPage>0 && page >totelPage){
      return next(new HandleError("Pget dont found",404));
      }
apiHelper.pagination(resultperpage);
const product=await apiHelper.query
 // console.log(req.query.id);
  if (!product || product.length===0) {
    return next(new HandleError(" No product found ", 404));
  }
  return res
    .status(200)
    .json({ success: true, message: "Product Fund",productCount,totelPage,currentpage:page, product,resultperpage});
};
//Get singel One
export const getSingleProduct = async (req, res ,next) => {
  console.log("curr",req.params.id);
  const id = req.params.id;
  const getSingle_Product = await ProductSchema.findById(id);
  console.log()
  if (!getSingleProduct&&!id) {
    return res
      .status(500)
      .json({ success: false, message: "Product not Found" });
    //return next(new HandleError("v",404))
  }
  return res.status(200).json({ success: true, getSingle_Product });
};

//Delete
export const getDeleteProduct = (req, res) => {
  const Delete_Product = ProductSchema.deleteOne({ _id: req.body });
  res.status(200).json({ successs: true, message: "Delete Success" });
};

//Update
export const getUpdateProduct = async (req, res) => {
  //console.log(req.params.id)
  const id = req.query.id;

  var value = req.body || { name: "Tnple" };

  var Update_Product = await ProductSchema.findByIdAndUpdate(id, value, {
    new: true,
    runValidators: true,
  });

  if (!Update_Product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not Found" });
  }
  return res.status(200).json({ successs: true, Update_Product });
};

//Product Review
export const createProductReview=async(req,res,next)=>{
    const {rating,comment,produtId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment:comment
    }


    const product=await ProductSchema.findById(produtId);
    if(!product){
        return next(new HandleError("product Not Found",400))
        
    }
    const existsReview=product.reviews.find((review)=>{review.user.toString()==req.user._id});
    if(existsReview){
        //update review
        product.reviews.forEach((e)=>{
            if(e.user.toString()===req.user._id){
            e.rating=rating;
            e.comment=comment;
        }
    });
    
    }
    else{
        //push review
        product.reviews.push(review);

    }
 product.numberOfRevies=product.reviews.length;
 let sum = 0;
 product.reviews.forEach((e)=>{sum+=e.rating});

 product.ratings=product.reviews.length > 0? sum/product.reviews.length : 0 ;

 await product.save({validateBeforeSave:false});
 res.status(200).json({
    success:true,
    product
 })
 

}


export const viewProductRevies=async (req,res,next) => {
  const product=Product.findById(req.query.id);
  if(!product){
    return next(new HandleError('Product not found',400))
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews,
  })
  
}

//Admine view all Products

export const AdmineViewAllProduct=async(req,res)=>{
  const product=ProductSchema.find();
  res.status(200).json({
    success:true,
    product
  })

}


//Admin delete Revie

export const DeleteAdmineReviews = async (req,res,next)=>{
  const product=await ProductSchema.findById(req.query.productId)
  
  if(!product){
    return next(new HandleError("product not found",400))
  }
  const reviews=product.reviews.filter((review)=>review._id.toString()!==req.query.id.toString())
console.log(reviews)
  const numberOfRevies=reviews.length;
 let sum = 0;
 reviews.forEach((e)=>{sum+=e.rating});

 const rating=reviews.length > 0? sum/reviews.length : 0 ;

 await ProductSchema.findByIdAndUpdate(req.query.productId,{numberOfRevies,reviews,rating},{new:true,runValidators:false} );

 res.status(200).json({
    success:true,
    message:"review ddelete successfuly"
    
 })

}