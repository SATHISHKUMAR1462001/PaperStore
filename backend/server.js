
import app from "./app.js";

import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";


dotenv.config({path:"backend/config/config.env"});


connectDB();




const PORT=process.env.PORT || 3000;
const server=app.listen(PORT, (e) => {
  console.log("Server is running on port " + PORT);
});


process.on('unhandledRejection',(err)=>{
  console.log(err.message)
  server.close(()=>{
    console.log("sever close")
    process.exit(1)
    
  })
})



