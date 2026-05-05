import React, { useEffect, useRef, useState } from 'react'
import  {motion}  from "motion/react"
import { ChevronRight,ChevronLeft } from 'lucide-react';
function Carosul() {
   
    
    const [index,setIndex]=useState(0)  
    const [toch,setToch]=useState(true)
    const intervelRef=useRef(null)
    const Images=[
        {id:1,image:"./src/assets/aqua-skin-care-creme-cosmetic.jpg",title:"one"},
        {id:2,image:"./src/assets/3d-podium-display-set-copy-space-white-background-cosmetics-beauty-products-promotion.jpg",title:"two"},
       
        {id:4,image:"./src/assets/cosmetic-male-beauty-products-with-display.jpg",title:"four"},
       
        {id:5,image:"./src/assets/skincare.jpg",title:"five"}
       
       
       
       
    ]
  //console.log( )
  const nextSlide=()=>{
    setIndex((pre)=>(pre+1)%Images.length)
  }
    const prevSlide=()=>{
    setIndex((pre)=>(pre-1+Images.length)%Images.length)
  }
      
    useEffect(()=>{
   if(toch)return;

     
  intervelRef.current=setInterval(()=>{
  
nextSlide();
       
     },1000)

   
     return ()=>clearInterval(intervelRef.current)
    },[toch])

  return (

     <div className="flex flex-col w-full p-1 items-center justify-center ">
      
    <div onMouseEnter={()=>{}} 
     onMouseLeave={()=>{}}
     onTouchStart={()=>{}}
     onTouchEnd={()=>{}}
     className=' border min-h-10 w-full max-h-70 overflow-hidden mt-2 md:mt-0  right-0 rounded-md  md:ml-0 mx-auto  md:max-w-6xl  md:mx-auto  shadow-lg'
     >
      <motion.div
      className=' flex  flex-1   cursor-grab active:cursor-grabbing'
      animate={{x:`-${index*100}%`}}
      transition={{type:'spring',stiffness:300,damping:30}}
      drag="x"
      dragConstraints={{left:0,right:0}}

      
      >
        {Images.map((slides)=>(
            <div key={slides.id} className=' gap-2  min-w-full '>
          <img src={slides.image}
          alt={slides.title} className='w-full  rounded-md min-h-full max-h-80 object-object md:overflow-cover
          
          md:object-center   pointer-events-none'
          />

            </div>
        ))}

      </motion.div>
      <button onClick={nextSlide} className=' hidden md:block absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow'><ChevronRight/></button>
        <button onClick={prevSlide} className='hidden md:block absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow'><ChevronLeft/></button>
    </div>
      </div>
   
  )
}

export default Carosul