import React from 'react'
import Navbar from '../component/Navbar'
import { PhoneIcon } from 'lucide-react';

function About() {
  const msg=`new:"demo"`
  const num="919514010346"
  const wht=`https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  return (
    <>
    <Navbar/>
    
    <div>About</div>
    <div>
      <a href={wht} target="_blank" rel="noopener noreferrer"><PhoneIcon/>send</a>
    </div>
    
    
    </>
    
  )
}

export default About