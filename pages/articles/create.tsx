import { useState } from "react"
import ReactMarkdown from 'react-markdown';

export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  return (
    <div className="flex">
      <div className="flex-1 border-4">
        Editor
        <div>
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            placeholder="My first article"
            className="input input-primary"
          />
        </div>
        <div>
          <textarea
            onChange={e => setContent(e.target.value)}
            value={content}
            placeholder="Article content written in Markdown"
            className="textarea textarea-primary"
          />
        </div>
      </div>
      <div className="flex-1 border-4">
        Preview
        <div className="prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )

/*   return (
    <div>
      <h1 className="text-3xl font-bold">Create Article</h1>
      <div>
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder="My first article"
          className="input input-primary"
        />
      </div>
      <textarea
        onChange={e => setContent(e.target.value)}
        value={content}
        placeholder="Article content written in Markdown"
        className="textarea textarea-primary"
      />
      <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  ) */
}
