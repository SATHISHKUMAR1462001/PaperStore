import React, { useEffect,useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Carosul from "../component/Carosul";
import SkeletonCard from "../component/SkeletonCard";
import ProductCard from "../component/ProductCard";

import { LensConcave } from "lucide-react";
import PageTitle from "../component/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../productes/producteSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagenation from "../component/Pagenation";
import Filtter from "../component/Filtter";

function Home() {
   const navigate= useNavigate()
  const { productes, productCount, loading,error,resultPerpage } = useSelector(
    (state) => state.product,)

    const [searchParams]=useSearchParams()
    const keyword="";
      const pageurl=parseInt(searchParams.get("page"),10) || 1;
        const[currentPage,setCurrentPage]=useState(pageurl)
        const totalPages=Math.ceil(productCount/(resultPerpage||8))
 
  const dispah = useDispatch();
  useEffect(() => {
    dispah(getProduct({keyword ,page:currentPage}));
    console.log(keyword)
  }, [dispah,keyword,pageurl]);

  const style = {
    grid: "grid pt-10 overlay-hidden pl-2  grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 ",
    sklyton:"grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse",
  };
 const handleNavigate=(data)=> navigate(`/product/${data._id}`)

  

  return (
    <div>
      <PageTitle title={"Home | E-comers"} />
      <div className="sticky top-0 z-50 ">
        <Navbar />
     
      </div>
      <div className=" sticky z-50 top-20 flex mr-10  justify-center items-center overflow-hidden  w-screen  ">
        
      </div>
    <div className="w-full ">
   <Carosul />

    </div>
       


      <main className="over-hidden">
      

        {loading || error? (
          <div className={style.sklyton}>
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (<> 
          <div className={style.grid}>
            
            {productes.map((data, i) => (
              <ProductCard key={i} data={data} handleNavigate={()=>handleNavigate(data)} />
            ))}
          </div></>
        )}
        
      </main>
      <div className="flex flex-row">
    
      </div>
     
      <footer>{/* <Footer/> */}</footer>
    </div>
  );
}

export default Home;
