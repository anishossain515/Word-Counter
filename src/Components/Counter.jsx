import React, { useEffect, useRef, useState } from 'react'

function WordCounter() {

    const TextRef = useRef(null)//stored textarea text
    const [CountNumber,SetCountNumber] = useState(0) // stored total word
    const [timeLeft , setTimeLeft] = useState(60)//Initial time 60s
    const [IsActive,setIsActive] = useState(false)
    const [IsAnimating , setIsAnimating] =useState(false)//handel animation
    const [SaveCountNumber , setSaveCountNumber] = useState(0)
 
    //Live Word Counting
    const CountWords = ()=>{
      const text = TextRef.current.value.trim()
      const WordCount = text .split(/\s+/).filter(word => word.length > 0)

      SetCountNumber(WordCount.length)
      setSaveCountNumber(WordCount.length)
    }


    //start Counting
    const StartCount = ()=>{
      setIsActive(true)
      setTimeLeft(10)
      SetCountNumber(0)
   }

   //Set Timer
   useEffect(()=>{
     let timer ;
      if(IsActive && timeLeft > 0){
        timer = setInterval(() => {
          setTimeLeft((preData)=> preData - 1)
        }, 1000);
      }else if(timeLeft === 0){
        setIsActive(false)
        CountWords();
        TextRef.current.value = ""
        setTimeLeft(60)
      }

      return ()=> clearInterval(timer)
   },[IsActive,timeLeft])

   //restart timer

   const Reverse = ()=>{
     setIsAnimating(true)
     setTimeLeft(0)
     TextRef.current.value = ""

     setTimeout(()=> setIsAnimating(false),500)
   }


  return (
    <>
     <div className='container flex flex-col mx-auto mt-5 gap-10'>

      <h1 className='text-center text-5xl font-semibold'>Word Counter</h1>

      <div>
         <h3 className='text-xl text-semibold pb-3 text-gray-800'>How Fast is Your Typing! :</h3>

         <textarea disabled={!IsActive} ref={TextRef} rows="6" className='form-control w-[1500px] h-[300px] border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300 text-[#212529]  text-2xl p-4'></textarea> 


          {/* start button */}
        <div className='text-center pt-2 flex items-center justify-center gap-4'>

          <button disabled={IsActive} onClick={StartCount} className='px-3 disabled:cursor-not-allowed py-2 bg-emerald-500 text-white rounded-md text-semibold'>Start Count</button>
          <p className='border border-1  bg-[#384351] px-3 py-2 text-white rounded-md'>Time Left : {timeLeft }</p>

          <i onClick={Reverse} className={`bx bx-revision text-3xl cursor-pointer ${IsAnimating ? "rotate-animation":""}`}></i>

        </div>


      </div>

     <div className='flex flex-row items-center justify-between gap-5'>

     <p className='text-xl'>Number Of Type : <span className='bg-[#f8f9fa] px-5 py-1.5 font-semibold rounded-md border border-black'>{CountNumber}</span></p> {/* total counting word */}
     <p className='text-xl'>Previous Record : <span className=' font-semibold '>{SaveCountNumber}</span></p> {/* total counting word */}

     </div>

     </div>
    </>
  )
}

export default WordCounter;
