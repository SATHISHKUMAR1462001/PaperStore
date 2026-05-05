import mongoose, { Types } from "mongoose";
const productschema=new mongoose.Schema({
    name:{type:String,
        required:[true, "pleace enter name"]
    },
    price:{
        type:Number,
        required:[true," "],
        maxLength:[7," "]
    },
    description:{
        type:String
    },
    ratings:{
        type:Number,
        default:0,
    },

    images:[
        {
            public_id:{
                type:String,
                
            },
            url:{
                   type:String,
                required:[true]
            },

        }
    ],
    category:{
        type:String,
        required:[true]
    },
    stock:{
        type:Number,
        required:[true, "pleace enter stock"],
        maxLength:[5," "],
        default:0,
            },
            
            numberOfRevies:{
                type:Number,
                default:0
            },
            reviews:[
                {   user:{type:mongoose.Schema.ObjectId, ref:"User",required:true},
                    name:{type:String,
                    required:true,
                },
                    rating:{type:Number,
                    required:true,
                },
                    comment:{type:String,
                    required:true,
                },
            },
            ],user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,


            }
            ,
            createdAt:{
                type:Date,
                default:Date.now,
            },

});
export default mongoose.model("Product",productschema);