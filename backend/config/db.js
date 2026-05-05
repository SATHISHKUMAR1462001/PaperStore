import mongoose from "mongoose";    
export const connectDB=()=>{
    mongoose.connect(process.env.URL,{
    // useNewUrlParser:false,
    // useUnifiedTopology:false,
}).then((data) => {
    console.log("MongoDB connected"+ data.connection.host);
}).catch((err) => {
    console.log("MongoDB connection error: ", err);
});

}