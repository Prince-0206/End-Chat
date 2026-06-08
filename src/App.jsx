import React, { useState } from 'react'
import { url } from './credits'
import { Answer } from './Components/Answer'

const App = () => {
  const [question, setquestion] = useState('')
  const [answer, setanswer] = useState()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      askquestion();
    }
  }

  
  const askquestion = async()=>{
    setquestion("  ")
    const paylaod = {
   
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }

    let response = await fetch(url,{
      method: "POST",
      body: JSON.stringify(paylaod)
    })
    response = await response.json();
    let result = response.candidates[0].content.parts[0].text
result = result.split("\n")
result = result.map((item) => item.trim())
result = result.filter((item) => item !== "" && item !== "•")  // ✅ lone "•" remove karo
setanswer(result)
  }
  return (
    <div className='grid grid-cols-5 h-screen text-center' style={{ background: '#07051a' }}>

      <div className='col-span-1 border-r border-indigo-900' style={{ background: '#0a0820' }}>
        <h1 className='text-indigo-400 text-xs font-medium tracking-widest uppercase p-5'>
          Recent Search
        </h1>
      </div>

      <div className='col-span-4 overflow-scroll p-10 flex flex-col gap-6' style={{ background: '#0d0b24' }}>

        <div className='flex-1 rounded-2xl border text-white border-indigo-900 overflow-y-auto' style={{ background: '#0f0c29' }}>
          <ul>
          {answer && answer.map((item, idx) => (
  <li key={idx} className="text-indigo-100 text-sm leading-relaxed px-6 py-2 text-left">
    <Answer ans={item} idx={idx} totalresult={answer.length} />
  </li>
))}</ul>
        </div>
          
        <div
          className='pr-1 w-1/2 m-auto rounded-full border border-indigo-800 flex h-16 p-1 items-center'
          style={{ background: '#1e1b4b' }}
        >
          <input onChange={(e) => setquestion(e.target.value)}
          onKeyDown={handleKeyDown}
          value={question}
            className='w-full h-full p-3 outline-none bg-transparent text-indigo-100 placeholder-indigo-500 text-sm'
            type="text"
            placeholder='Ask Me Anything'
          />
          <button onClick={askquestion} className='bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 h-full rounded-full transition-colors'>
            Ask
          </button>
        </div>

      </div>
    </div>
  )
}

export default App