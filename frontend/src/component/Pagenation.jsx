import React from 'react'

import{Pagination}from "@mui/material"

 function Pagenation({setCurrentPage,currentPage,productCount}) {
 

  const next=()=>setCurrentPage(currentPage+1)
  /// prev=()=>setCurrentPage(currentPages
  return (
<div className='  flex items-center justify-around w-full h-auto '> 
  
<Pagenation  />

  </div>

     

  );
}


export default Pagenation