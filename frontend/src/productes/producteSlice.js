import{createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const  getProduct=createAsyncThunk("product/getProduct",async({keyword,page},{rejectWithValue})=>{
    try {
        // const link="/api/v1/products";
       
        const link=keyword?`http://localhost:3000/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`: `http://localhost:3000/api/v1/products`
        const {data}=await axios.get(link)
         console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || " Wrong ")
        
    }
})
export const  getProductDetails=createAsyncThunk("product/getProductDetails",async(id,{rejectWithValue})=>{
    try {
        const link=`/api/v1/product/${id}`;
       
        const {data}=await axios.get(link)
        
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data||" Wrong ")
        
    }
})
const productSlice=createSlice({
    name:"product",
    initialState:{
        productes:[],
        productCount:0,
        loading:false,
        error:null,
        product:null,
        resultperpage:4,
        totelPage:0,

    },
    reducers:{
        removeError:(state)=>{state.error=null},
    },
    extraReducers:(builder)=>{
       builder
       .addCase(getProduct.pending,(state)=>{
        state.error=null,
        state.loading=true
        state.productCount=0;
       })
       .addCase(getProduct.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.loading=false
        state.error=null
        state.productCount=action.payload.productCount;
        state.productes=action.payload.product


       })
       .addCase(getProduct.rejected,(action,state)=>{
         state.loading=false
         state.products=[];
       
        state.error= action.payload||" Error Found"
       })     
       .addCase(getProductDetails.pending,(state)=>{
        state.error=true,
        state.loading=null
       })
       .addCase(getProductDetails.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.loading=false
        state.error=null
       
        state.product=action.payload.getSingle_Product;


       })
       .addCase(getProductDetails.rejected,(action,state)=>{
         state.loading=false
        state.error= action.payload||" Error Found"
       });
    }
    
    
})

export const {removeError}=productSlice.actions
export default productSlice.reducer;