import React from 'react'

import { StarIcon } from 'lucide-react';

function Starvalues({value}) {
    const stars=5
    
    
  return (
    <div className='flex gap-2  '>
        {
            Array.from({length:stars},(_,index)=>{
                const starvalue=index+1;
                return(
                    <StarIcon
                    
                    key={starvalue}
                    className={`transition-all ${starvalue<=value? 'fill-yellow-400 border-none text-white bg-white' :'text-white'}`}
                    
                    
                    
                    />
                )
            })
        }


    
    </div>
  )
}



export default Starvalues
