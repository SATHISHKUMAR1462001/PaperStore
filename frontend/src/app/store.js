import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../productes/producteSlice'
export const store=configureStore({
    reducer:{
        product:productReducer
    }
})