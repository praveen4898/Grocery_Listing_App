import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grocerycad from './Grocerycad'

const Groceryform = () => {
    const [name,setName]=useState("")
    const [quantity,setQuantity]=useState("")
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const[groceries,setGroceries]=useState([])

  useEffect(() => {
    fetchgroceries();
}, []);


const handleDelete=()=>{
    fetchgroceries()
}

const handleUpdate=()=>{
    fetchgroceries()
}
 const fetchgroceries=async()=>{
    try {
        const totalgroceries= await axios.get("https://groceryjsonserver.onrender.com/groceries")
    setGroceries(totalgroceries.data)
    
    console.log(totalgroceries.data)
    } catch (error) {
        console.log(error)
    }
    
  }

{groceries.map((grocery,index)=>(
    <Grocerycad  key={grocery.id} grocery={grocery}/>

)

)}

const handlesubmit=async(e)=>{
    e.preventDefault()
   try{
        const grocerydetail={
            name:name,
            quantity:quantity,
            price:price,
            description:description
    
        }
       const response= await axios.post("https://groceryjsonserver.onrender.com/groceries",grocerydetail)
       console.log(response.data)
        console.log("grocery added")
        fetchgroceries()
    } catch (error) {
        console.log(error)
    }
}




  return (
    <div style={{backgroundColor:"black", maxWidth:"auto"}}>
     

 <form style={{backgroundColor:"yellow", display:"flex", flexDirection:"column", gap:"8px"}} onSubmit={handlesubmit}>
 
    <input  type="text" placeholder='name' required value={name} onChange={(e)=>setName(e.target.value)}/>
    <input type="text" placeholder='Quantity in KG' required value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
    <input type="text" placeholder='Price in RS' required value={price} onChange={(e)=>setPrice(e.target.value)} />
    <input type="text"  placeholder='Description' required value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <div><button >ADD</button></div>
    
 </form>
 {groceries.map((grocery,index)=>(
    <Grocerycad  key={grocery.id} grocery={grocery} onDelete={handleDelete} onUpdate={handleUpdate}/>

)

)}
    </div>
  )
}

export default Groceryform