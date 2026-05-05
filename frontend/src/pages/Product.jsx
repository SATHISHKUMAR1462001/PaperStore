






import React,{useEffect, useState} from 'react'
import Navbar from '../component/Navbar'
import Carosul from "../component/Carosul";
import SkeletonCard from "../component/SkeletonCard";
import ProductCard from "../component/ProductCard";

import { AmbulanceIcon, HelpCircle, LensConcave, Phone, Warehouse, WormIcon } from "lucide-react";
import PageTitle from "../component/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeError } from "../productes/producteSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagenation from "../component/Pagenation";
import Filtter from "../component/Filtter";
import toast from 'react-hot-toast';

const Product = () => {


  const style = {
    grid: "grid pt-4  border-slate-300  border-md overlay-hidden pl-2 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 ",
    sklyton:"grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse",
  };
  const navigate= useNavigate()
  const { productes, productCount, loading,error,resultPerpage } = useSelector(
    (state) => state.product,)
    const pagecount=Math.round(productCount/resultPerpage)
        const [searchParams]=useSearchParams() 
     const keyword=searchParams.get("keyword")||"";
    const pageurl= parseInt(searchParams.get("page")) || 1;
    const[currentPage,setCurrentPage]=useState(pageurl)
    const totalPages=Math.ceil(productCount/(resultPerpage || 8))

  const handlePageChange=(pageNumber)=>{
    if(pageNumber!==currentPage){
      setCurrentPage(pageNumber) 
      const newSearchParams=new URLSearchParams(location.search)
    
      
    if(pageNumber===1){
      newSearchParams.delete("page")
     
    }
    else{
      newSearchParams.set("page",pageNumber)
    }
   navigate(`?${newSearchParams.toString()}`)
    
  }
  }
    console.log(loading,error,keyword,productCount,currentPage)
 
  const dispah = useDispatch();
  useEffect(() => {
    dispah(getProduct({keyword,page:currentPage}));
    console.log(keyword)
  }, [dispah,keyword,pageurl,currentPage]);
currentPage
   const handleNavigate=(data)=> navigate(`/product/${data._id}`)
 useEffect(()=>{
  console.log(error)
  if(error){
    toast.error(error.message)
    dispah(removeError())
  }
 },[dispah,error])
  return (<>
  <div className='bg-white sticky top-0 z-50'>
     <Navbar/>
  </div>
 
    <div className=' flex w-full   h-full'>



        <div className=' sticky min-w-15 max-w-15 min-[500px]:top-14 min-[214px]:top-28 z-50 justify-self-center mx-auto  items-center overful-hidden   h-100'>
            <aside className='w-fullh-auto  flex  justify-center mt-2 text-md font-medium gap-y-1 top-5 pt-5'>
                <ul className='gap-3 truncate place-items-center-safe flex flex-col flex-1 justify-center mx-1/2 items-center-safes space-y-3'>
                    <li><a href="#"><Phone/> </a></li>
                    <li><a href="#"><WormIcon/></a></li>
                    <li><a href="#"><HelpCircle/></a></li>
                    <li><a href="#"><Warehouse/></a></li>
                    <li><a href="#"><AmbulanceIcon/></a></li>
                </ul>
            </aside>
        </div>
        <div className=' overflow-hidden flex-2 w-full h-full'>
  {loading? ( productCount>=0?
  <div className={style.sklyton}>
    <p>Number of 0-{productCount} Products found</p>
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>:<div className=' h-full my-auto w-full flex flex-col pt-50 items-center justify-between'> Poduct Not Found</div>
          
        ) : (<>  <p>Number of 0-{productCount} Products found</p>
          <div className={style.grid}>
            
            {productes.map((data, i) => (
              <ProductCard key={i} data={data} handleNavigate={()=>handleNavigate(data)} />
             
            ))} 
          
          </div>
          
            <Pagenation pagecount={pagecount} setCurrentPage={setCurrentPage} productCount={productCount} handlePageChange={handlePageChange} totalPages={totalPages}/>
          
          
          </>
        )}



            
        </div>
    </div>
    
    </>
  )
}

export default Product