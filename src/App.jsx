import { useState,useCallback ,useEffect,useRef} from 'react'
import './App.css'

function App() {

  const [length, setLength]=useState(8);
  const [number,setNumber]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");


  //ref
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for(let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,charAllowed,number,setPassword])

  const copyPassword=useCallback(()=>{
     passwordRef.current?.select();
    //  passwordRef.current?.setSelectionRange(0,3);
      window.navigator.clipboard.writeText(password);
  },[password])

useEffect(()=>{
  passwordGenerator()
},[length,number,charAllowed,passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-400'>

    <h1 className='text-4xl text-center text-white'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type='text' 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
         <button
        onClick={copyPassword}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      </div>
      <div className='flex tex-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}
          name=''
          id=''/>
          <label htmlFor='length'>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={number}
          onChange={() => {
            setNumber((prev) => !prev)
          }}
           name=""
          id="" />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
           name=""
          id="" />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
