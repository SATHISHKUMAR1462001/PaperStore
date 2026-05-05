//import React, { useEffect,useState } from 'react'

function SkeletonCard() {
  return (
    <div className="bg-white-300 rounded-2xl shadow-md gap-4 p-4">
      <div className="shimmer h-48 w-full rounded-xl" />
      <div className="mt-4 space-y-2">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-3 w-1/2 rounded" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="shimmer h-5 w-16 rounded" />
        <div className="shimmer max-h-auto h-6 w-20 rounded ani " />
      </div>

      <style jsx="true">{`
        
        .shimmer{
        position:relative :
        overflow:hidden;
        background:#e5e7eb
        }
        .shimmer:after{
        content:"";
        position:absolute;
        top:0;
        left:-150px;
        height:100%;
        width:150px;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent);
        animation:shimmer 3s infinits;
        }
        @keyframes shimmer{
        100%{
        transform:translateX(300px)}}
        `}</style>
    </div>
  );
}

export default SkeletonCard;
