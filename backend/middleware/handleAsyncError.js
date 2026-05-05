export default (myerror)=>(res,req,next)=>{
    Promise.resolve(myerror(req,res,next)).catch(next)

}