import React, { useEffect, useState } from 'react'

export const Answer = ({ans,idx,totalresult}) => {
    const [heading, setheading] = useState(false)
    const [content, setcontent] = useState(ans)
    useEffect(() => {
      if(checkheading(ans)){
        setheading(true);
        setcontent(replaceheading(ans))
        console.log(ans,idx);
        
      }

      
    },[])
    const checkheading = (str)=>{
        return  /^(\*)(\*)(.*)\*$/.test(str)
    }
    const replaceheading = (str)=>{

return str.replace(/^(\*)(\*)|(\*)$/g,'')

    }
  return (
   <>
   {
    idx==0&&totalresult.length>1?<span className='text-3xl'>{content}</span>:
    heading?<span className='pt-2 text-cyan-600 text-lg block'>{content}</span>:<span>{content}</span>
   }
   </>
  )
}
// {idx == 0 && totalresult.length > 1
    //     ? <span className='text-3xl font-semibold text-indigo-100 block pb-2'>{content}</span>
    //     : heading
    //     ? <span className='pt-2 text-violet-400 text-lg block'>{content}</span>
    //     : <span className='text-indigo-200 text-sm leading-relaxed'>{content}</span>
    // //   }
