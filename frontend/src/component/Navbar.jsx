
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import { motion } from "motion/react"
import  {Menu, PhoneCallIcon, PhoneIcon, SearchIcon, ShoppingBag, ShoppingCart, User, X}from "lucide-react"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";



function Navbar() {
const navigate=useNavigate()
  const [opened,setOpened]=useState(false);
 
  const [search,setSearch]=useState("")
 
  const linkClass=({isActive})=>isActive ? "text-blue-500 font-bold":"text-slate-600 font-bold hover:text-blue-500";
  
  const Log_Name="Electonic Mart..."
  let Brand="CDM";
      
 const [page,setPage]=useState(1)



  const handleSearch=(e)=>{
    e.preventDefault()
    if(search.trim()){
      navigate(`/product?keyword=${encodeURIComponent(search.trim())}&page=${1}`)
      
    }
    else{
      navigate("/product")
    }
    setSearch("")

  }

  return (<>
    <nav className="bg-white max-w-full shadow-md sticky top-0   ">
     <div className="flex  lg:flex-1 max-w-6xl mx-auto p-3 justify-between items-center">
         {/*<ShoppingBag/>Logo*/}
        <Link className="flex items-center gap-1 text-2xl font-bold text-blue-600" to="/">

        {

               
        Brand.split("").map((value,i)=>(
            <motion.span key={i}
           
            initial={{opacity:0,x:-40}}
            animate={{opacity:1,x:0}}
            transition={{delay:i*1}}
            >
              
              <span>{value}</span>
            </motion.span>
        ))
        }

        
          {
        Log_Name.split("").map((value,i)=>(
            <motion.span key={i}
           
            initial={{opacity:0,x:-40}}
            animate={{opacity:1,x:0}}
            transition={{delay:i*0.7}}
            >
              
                <span className="hidden md:flex text-sm pt-2 ">{value}</span>
            </motion.span>
        ))
    }
        
        </Link>
        <div className=" max-w-screens  " >
          {/*  */}
        <form onSubmit={handleSearch} className=" hidden sm:black min-w-20 flex flex-1 justify-between items-center border rounded border-slate-700">
            <input placeholder=" Seach Product" value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="pl-1 min-w-20 focus:outline-none"/>
           <button type="submit" className="text-emerald-400  font-bold m-2 hover:text-blue-500  " > <SearchIcon className="" size={22}/></button>
          </form>
        </div>
         {/*<ShoppingBag/>Logo*/}
         <div className="hidden md:flex items-center space-x-6 ">
          <NavLink to="/" className={linkClass}  >Home</NavLink>

         
           <NavLink to="/about-us"  className={linkClass}  >  </NavLink>
          
          <NavLink  to="/Login-us"  className={"hidden sm:flex gap-2 items-center bg-blue-600 text-slate-200 px-2 py-2 h-8 rounded-lg"}><User/>Login</NavLink>
          <NavLink    to="/" className={linkClass}><ShoppingCart  className="text-slate-700 hover:text-blue-600 font-bold  relative " size={21}/>
          {/* <span className=" absolute top-2.5 right-59 text-xs rounded-full min-w-3 g-3 bg-blue-500 text-slate-200 flex items-center justify-center ">6</span> */}
          
          
          </NavLink>
          <NavLink  to="/" className={"hidden"}>Orders</NavLink>
          {/*search */}
          
             <input placeholder={"Search"} type="text" className="hidden  flexrelative border border-blue-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              
             <form onSubmit={handleSearch} className="  max-[20px]:hidden min-w-20 flex flex-1 justify-between items-center border rounded border-slate-700">
            <input placeholder=" Seach Product" value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="pl-1 min-w-20 focus:outline-none"/>
           <button type="submit" className="text-emerald-400  font-bold m-2 hover:text-blue-500  " > <SearchIcon className="" size={22}/></button>
          </form>
            
         
       </div>
       {/*<Hambergur menu/>Logo*/}
       <div className=" w-8 md:hidden">
        <button onClick={()=>setOpened(!opened)}>
          {opened ? <X className=" transform text-3xl font-bold size-8 "/>:<Menu className=" transform "/>}
        </button>

       </div>
       {/* {opened&&(
        <div className="md:hidden fixed max-w-auto flex-col  inset-0  py-1/2 bg-black/86 px-4 pb-4 space-y-2 ">
         
          <nav className="p-4 pt-7 max-w-auto place-items-center-safe space-y-3">
            <NavLink to="/" className="block text-white" onClick={()=>setOpened(false)}  >Home</NavLink>
          <NavLink  to="/about-us"  className="block text-white"  >About</NavLink>
          <NavLink  to="/Login-us"  className="block text-white"  >Login</NavLink>
          <NavLink    to="/" className="block text-white"  >Cart</NavLink>
          <NavLink  to="/" className="block text-white"  >Orders</NavLink>
          <input onChange={(e)=>setCh(e.target.value)} type="text" className="mx-auto flex max-w-auto border pb-0 rounded-2xl pl-3 text-slate-100 border-amber-100 "/>
          <br className="p-0"/>
           <button className="flex -my-6 border pl-10 rounded-2xl mx-auto  w-32 hover:bg-blue-500 hover:border-none  hover:text-slate-200 " onClick={()=>alert(`search ${ch} Clicked`)}> Search</button>
          </nav>
        
            </div>
       )} */}
     </div>
     
     <div className={` md:hidden overflow-hidden  transition-all  duration-300 ease-in-out ${opened? "max-h-96 opacity-100 translate-y-2 pb-3 bg-slat/60":"max-h-0 opacity-0 -translate-y-0 "}`}>
      <div className={` flex flex-col justify-center gap-4 p-4 items-center`}>
        <NavLink to="/" className={"text-slate-100 font-bold",linkClass}  >Home</NavLink>
          <NavLink  to="/about-us"  className={"text-slate-100 font-bold",linkClass}>About</NavLink>
          <NavLink  to="/Login-us"  className={" flex gap-6 items-center bg-blue-600 p-3 text-slate-200 px-3 py-3 w-auto h-8 rounded-lg"}>Login</NavLink>
       
          <NavLink  to="/" className={linkClass,"hidden"}>Orders</NavLink>
      </div>
     </div>

    </nav>
    <div className=" with-auto hidden max-[470px]:block bg-white p-2  " >
          {/*  */}
          <form onSubmit={handleSearch} className="  sm:black min-w-20 flex flex-1 justify-between items-center border rounded border-slate-700">
            <input placeholder=" Seach Product" value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="pl-1 min-w-20 focus:outline-none"/>
           <button type="submit" className="text-emerald-400  font-bold m-2 hover:text-blue-500  " > <SearchIcon className="" size={22}/></button>
          </form>
        </div>
    </>
  );
}

export default Navbar;
