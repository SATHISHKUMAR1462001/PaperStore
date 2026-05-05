import React, {useEffect}from 'react'
import Navbar from '../component/Navbar'
import { Minus, Notebook, NotebookPen, PackageCheck, Plus, ShoppingCartIcon, Star, StarHalf } from 'lucide-react'
import Starvalues from '../component/Starvalues'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../productes/producteSlice'
import toast from 'react-hot-toast'

function ProductViewPage() {

    //const{state}=useLocation()
    const {id}=useParams()
    

      const { product,loading } = useSelector(
    (state) => state.product)

 
  const dispah = useDispatch();
  useEffect(() => {
    dispah(getProductDetails(id));
  },[dispah]);
console.log()

  return (
  
     <div className='min-h-screen  bg-gray-50'>
        <div>

        </div>
    <Navbar />
    {product  ?
   <main className='w-auto md:max-w-7xl    mx-auto px-4 py-8 md:py-12  '>
     <div className=' shadow-xl rounded-md grid grid-cols-1 gap-2 md:gap-12 bg-white pt-2 pb-0 md:p-8 md:grid-cols-2  ' >
        <div className='object-cover relative w-auto  h-full '>
            {/*  image*/}
         <div className='    flex flex-1 justify-center  items-center h-40 sm:h-80'><img className=' sm:w-auto  h-40 sm:h-full  rounded-xl sm:hover:shadow-xl' src={ product.image[0]||" No image " } />
         <div className=' min-[500px]:hidden  blur-80s  w-auto absolute bottom-0 right-1   h-auto   flex-row-reverse '>
              
                 <div className="flex items-center border-1 border-gray-50 rounded-md bg-white ">
                    <button className=' p-1 transition-colors'><Minus size={14}/></button>
                    <span className='text-xs'>1</span>
                    <button  className=' text-xs p-1 transition-colors'><Plus size={14}/></button>

              </div>
         </div>
         </div>
         </div>


         {/* p-details */}
         <div className=' overflow-hidden pt-0 md:p-8'>
         <h3 className='pl-4 font-xs font-m text-sm md:text-3xl md:font-bold truncate  text-gray-900 md:mb-2 '>{ product.product_name||" No image "}</h3>
         <div className=' font-xs pl-3'>
            <Starvalues  className="xs:text-xs"  value={ product.numberOfRevies||2} size={10}/>
            </div>
         <div className='flex gap-2 text-xs pl-4  md:p-0'>
            <span className=' ' >${product.discounted_price}</span><span className='line-through'>${product.retail_price
}</span><span className='text-green-500'>20% OFF</span>
         </div>
         <p className='pl-4 pr-4 md:p-0 md:py-2 text-xs md:font-xl overflow-hidden w-auto h- md:h-20  line-clamp-1 sm:line-clamp-3 '><span className='hidden md:block'  ><NotebookPen/> </span> {product.description}</p>
        <div>
            <div className='flex gap-2 text-xs md:text  p-4 md:p-0 pt-2'>
                
                <span className='hidden sm:block'> <PackageCheck /></span>
                <span className='gap-2 text-green-500'> In Stock( <span className='text-green-500'>5</span> Avalabel) </span>

            </div>
            <div className='hidden sm:block'>
            <div className=' flex p-2 flex-wrap  justify-between gap-4 pt-10 -bottom-10 items-center '>
                <div className="flex items-center border-2 border-gray-100 rounded-md bg-white ">
                    <button className=' p-2 transition-colors'><Minus/></button>
                    <span>1</span>
                    <button  className=' p-2 transition-colors'><Plus/></button>

                </div>
                <button onClick={()=>toast.success("product Add to Cart")} className='max-h-10  bg-blue-600 flex items-center gap-3 justify-center rounded-xl shadow-xl px-8  py-2 transition-all show-blue-100 text-white overflow-hidden hover:scale-81'><ShoppingCartIcon/><span className='hidden  min-[300px]:block  '>Add to Cart</span></button>

                
            </div></div>
         </div>
         
         
         </div>


        </div>
       

 
    </main>:<p>Looding</p>}
    </div>
    
  
  )
}

export default ProductViewPage