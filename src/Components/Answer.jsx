import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import atomOneDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark'
import ReactMarkdown from 'react-markdown'

const Answer = ({ ans, totalResult, index, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans))
    }
  }, [])

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          style={atomOneDark}  // ✅ atomOneDark use karo
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-[#0a0820] text-violet-300 text-xs px-1.5 py-0.5 rounded font-mono" {...props}>
          {children}
        </code>
      );
    }
  }

  return (
    <>
      {index == 0 && totalResult > 1
        ? <span className="pt-2 text-xl block text-white">{answer}</span>
        : heading
        ? <span className="pt-2 text-lg block text-white">{answer}</span>
        : <span className={type == 'q' ? 'pl-1' : 'pl-5'}>
            <ReactMarkdown components={components}>{answer}</ReactMarkdown>
          </span>
      }
    </>
  )
}

export default Answer