import React from 'react'

export const Answer = ({ ans, idx, totalresult }) => {

  const boldify = (str) =>
    str.replace(/\*\*(.*?)\*\*/g, '<span style="color:#c4b5fd;font-weight:500;">$1</span>')

  // First line = title
  if (idx === 0 && totalresult.length > 1) {
    return <p className='text-2xl font-bold text-indigo-100 pb-3 border-b border-indigo-900 mb-2'>
      {ans.replace(/\*\*/g, '')}
    </p>
  }

  // Divider
  if (ans === '---') {
    return <hr className='border-indigo-900 my-4' />
  }

  // #### Sub heading
  if (ans.startsWith('#### ')) {
    return <p className='text-sm font-semibold text-indigo-300 mt-3 mb-1'>{ans.slice(5)}</p>
  }

  // ### Section heading
  if (ans.startsWith('### ')) {
    return <p className='text-base font-semibold text-cyan-400 mt-5 mb-1'>{ans.slice(4)}</p>
  }

  // ## or # Heading
  if (ans.startsWith('## ') || ans.startsWith('# ')) {
    return <p className='text-lg font-bold text-indigo-100 mt-5 mb-2'>{ans.replace(/^#{1,2}\s/, '')}</p>
  }

  // **bold line** = subheading
  if (ans.startsWith('**') && ans.endsWith('**')) {
    return <p className='text-sm font-semibold text-violet-400 mt-3 mb-1'>{ans.slice(2, -2)}</p>
  }

  // Bullet point
  if (ans.startsWith('* ') || ans.startsWith('- ') || ans.startsWith('• ')) {
    return (
      <p className='text-indigo-200 text-sm leading-relaxed flex gap-2 pl-2 mb-1'>
        <span className='text-violet-400 flex-shrink-0'>•</span>
        <span dangerouslySetInnerHTML={{ __html: boldify(ans.slice(2)) }} />
      </p>
    )
  }

  // Numbered list
  if (/^\d+\.\s/.test(ans)) {
    const num = ans.match(/^\d+/)[0]
    const text = ans.replace(/^\d+\.\s/, '')
    return (
      <p className='text-indigo-200 text-sm leading-relaxed flex gap-2 pl-2 mb-1'>
        <span className='text-violet-400 flex-shrink-0 font-medium'>{num}.</span>
        <span dangerouslySetInnerHTML={{ __html: boldify(text) }} />
      </p>
    )
  }

  // Normal text
  return (
    <p className='text-indigo-200 text-sm leading-relaxed mb-1'
      dangerouslySetInnerHTML={{ __html: boldify(ans) }}
    />
  )
}