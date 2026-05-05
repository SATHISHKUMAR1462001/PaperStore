import { Key } from 'lucide-react'
import React from 'react'

function Footer() {
 const company_Details=[{
"Company_Name":"CDM Info Tech",
"Address":"No:14 Katan Kulam Road Chidambaram",
"State":"Tamil Nadu",
"Country":"India",
"PinCode":608502,
"Mobile":"+91 9514010346"

 }]


  return (
    <div>
<div>
{company_Details.map((value)=>Object.entries(value).map(([key,value])=><p>{key}:{value}</p>))}
   
</div>

    </div>
  )
}

export default Footer