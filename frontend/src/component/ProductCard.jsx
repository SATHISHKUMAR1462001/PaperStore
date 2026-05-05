import { CarTaxiFront } from "lucide-react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProductViewPage from "../pages/ProductViewPage";

function ProductCard({ data }) {
  const navigate = useNavigate();

  //const {0} =productdu
  // eslint-disable-next-line react-hooks/purity
  //   const random=Math.floor(Math.random(100,10000)*100)

  return ( <>{data?
    <div
      onClick={() => navigate(`/product/${data._id}`, { state: data })}
      key={data.index}
      className=" max-w-6xl min-h-20 max-h-100  overlay-hidden flex flex-col items-center justify-between  rounded">
   
      
      <div className=" relative rounded-md flex w-40 sm:w-full h-48 items-center justify-center overflow-hidden ">
        <img
          className="    max-h-full max-w-full object-contain gb-slate-700   "
          alt={data.product_name}
          src={data.image[0]}
        />
        <div className="absolute inset-0 bg-slate-700/10"></div>
      </div>
    
      <div className="m-1 items-start w-35  ">
        <p className=" truncate    overflow-hidden  rounded text-xs font-bold">
          {data.product_name + ".."}
        </p>
        <p className="  space-y-4  space-x-1.5 w-fulls  rounded  font-xs">
          
          <span className="line-through  text-xs">${data.retail_price}</span>
          <span className="text-green-500  text-xs">{Math.round((data.retail_price-data.discounted_price)/data.retail_price*100)}% OFF</span>
          <h3 className=" text-xs text-blue-500 font-bold pt-1"><span>Buy at $ </span>{data.discounted_price}</h3>
        </p>
      
      </div>

   
</div>
   :<><p> Product Not Found</p></>}
    </>
  );
}

export default ProductCard;
