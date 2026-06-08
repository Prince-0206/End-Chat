import React from 'react'

export const Answer = ({ ans, idx, totalresult }) => {

  const strip = (str, pattern) => str.replace(pattern, '').trim()
  const removeBold = (str) => str.replace(/\*\*/g, '')

  if (idx === 0 && totalresult.length > 1)
    return <p className='text-2xl font-bold text-indigo-100 pb-3 border-b border-indigo-900 mb-2'>{removeBold(ans)}</p>

  if (ans === '---')
    return <hr className='border-indigo-900 my-4' />

  if (/^#{4}\s/.test(ans))
    return <p className='text-sm font-semibold text-indigo-300 mt-3 mb-1'>{strip(ans, /^#{4}\s/)}</p>

  if (/^#{3}\s/.test(ans))
    return <p className='text-base font-semibold text-cyan-400 mt-5 mb-1'>{strip(ans, /^#{3}\s/)}</p>

  if (/^#{1,2}\s/.test(ans))
    return <p className='text-lg font-bold text-indigo-100 mt-5 mb-2'>{strip(ans, /^#{1,2}\s/)}</p>

  if (/^\*\*.*\*\*$/.test(ans))
    return <p className='text-sm font-semibold text-violet-400 mt-3 mb-1'>{strip(ans, /^\*\*|\*\*$/g)}</p>

  if (/^[•\*\-]\s/.test(ans))
    return (
      <p className='text-indigo-200 text-sm leading-relaxed flex gap-2 pl-2 mb-1'>
        <span className='text-violet-400 flex-shrink-0'>•</span>
        <span dangerouslySetInnerHTML={{ __html: ans.replace(/^[•\*\-]\s/, '').replace(/\*\*(.*?)\*\*/g, '<span style="color:#c4b5fd;font-weight:500;">$1</span>') }} />
      </p>
    )

  if (/^\d+\.\s/.test(ans))
    return (
      <p className='text-indigo-200 text-sm leading-relaxed flex gap-2 pl-2 mb-1'>
        <span className='text-violet-400 flex-shrink-0 font-medium'>{ans.match(/^\d+/)[0]}.</span>
        <span dangerouslySetInnerHTML={{ __html: ans.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<span style="color:#c4b5fd;font-weight:500;">$1</span>') }} />
      </p>
    )

  return (
    <p
      className='text-indigo-200 text-sm leading-relaxed mb-1'
      dangerouslySetInnerHTML={{ __html: ans.replace(/\*\*(.*?)\*\*/g, '<span style="color:#c4b5fd;font-weight:500;">$1</span>') }}
    />
  )
}