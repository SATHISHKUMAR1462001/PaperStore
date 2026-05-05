import React from 'react'

function Filtter() {

const filter=["All","Mobile","Women","Men","mm ","",""]



  return (
    

<aside className=' bg-white flex  h-7  items-center mx-1 justify-around overflow-scroll-x '>
    {filter.map((e,i)=>
 <div key={i}>
         <a key={i} className='font-medium' href='#'>{e}</a>
    </div>
          
       
    
    )}
    

</aside>

    
  )
}

export default Filtter