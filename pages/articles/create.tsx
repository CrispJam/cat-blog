import { useState } from "react"
import ReactMarkdown from 'react-markdown';

export default function Create() {
  const [title, setTitle] = useState('');
  const [perex, setPerex] = useState('');
  const [content, setContent] = useState('');

  const publish = async () => {
    
  }

  return (
    <div className="flex flex-wrap">
      <div className="flex-1 border-4 m-5 p-5">
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder="My first article"
          className="input input-primary block min-w-full"
        />
        <textarea
          onChange={e => setPerex(e.target.value)}
          value={perex}
          placeholder="Article perex written in Markdown"
          className="textarea textarea-primary block min-w-full"
        />
        <textarea
          onChange={e => setContent(e.target.value)}
          value={content}
          placeholder="Article content written in Markdown"
          className="textarea textarea-primary block min-w-full"
        />
        <button
          className="btn btn-primary"
          onClick={() => publish()}
        >
          Publish
        </button>
      </div>
      <div className="flex-1 border-4 m-5 p-5">
        <div className="prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
