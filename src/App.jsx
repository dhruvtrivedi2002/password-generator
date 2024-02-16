import { useCallback, useEffect, useState,useRef } from "react"
import React from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setpassword] = useState("")
  const passref = useRef(null)
  
  const passwordgenerator = useCallback(
    () => {
      let pass=""
      let string="ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrstuvwxyz"
      if (numberallowed) {string +="012356789"}
      if (charallowed) {string +="!@#$%^&*()_-/*-+"}
      for (let i = 1; i <=length; i++) {
        let char = Math.floor(Math.random()*string.length+1)
        pass += string.charAt(char)
      }
      setpassword(pass)
    },
    [length,numberallowed,charallowed,setpassword])
    
    useEffect(() => {
      passwordgenerator()
    }, [length,numberallowed,charallowed])
   
    const copypasswordtoclipboard = useCallback(() =>{
      passref.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])
  
    return (
    
    <>
    
    <div className="bg-black text-white flex justify-center items-center h-screen w-full">
     <div className="bg-orange-500 h-3/5 w-auto ">
      <input type="text" placeholder='Password' readOnly value={password} onChange={(e)=>setpassword(e.target.value) } ref={passref}
      className="border-4 font-bold text-3xl mt-16 ml-16 mb-16 mr-2 w-3/5 h-16 border-solid border-black text-black" />
      <button className="bg-blue-800 h-16 w-40 border-black border-4 text-2xl"
       onClick={copypasswordtoclipboard}>Copy</button>
      <br />
      <input type="range" min={0} max={100} value={length} onChange={(e)=>{setlength(e.target.value)}} 
      className="mt-16 ml-10 mb-16 mr-2 w-40 h-5 "/>
      <label className="text-black font-bold text-5xl" >length:{length}</label>
      <input type="checkbox" defaultChecked={numberallowed} onChange={()=>{setnumberallowed((prev)=>!prev)}}
       id= "numberinput" className="size-11 mr-2 ml-2" />
      <label className="text-black font-bold size-11 text-5xl" htmlFor="numberinput">Number</label>
      <input type="checkbox" className="size-11 mr-2 ml-2" defaultChecked={charallowed} 
      id="characterinput" onChange={()=>{setcharallowed((prev)=>!prev)}}/>
      <label className="text-black font-bold size-11 text-5xl mr-7 " 
      htmlFor="characterinput">Character</label>
    </div>   
    </div>
    </>
  )
}
export default App