import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown';
import { TokenContext } from "../../components/Layout";
import { publishArticle, uploadImage } from "../../lib/api";

export default function Create() {
  const [title, setTitle] = useState('');
  const [perex, setPerex] = useState('');
  const [content, setContent] = useState('');
  const { token } = useContext(TokenContext);

  const imageInputRef = useRef(null);
  const router = useRouter();

  const publish = async () => {
    try {
      // TODO add validation:
      // no empty title, perex, content, and image
      if (imageInputRef.current && imageInputRef.current.files[0]) {
        console.log("publishing...");
        const imageReponse = await uploadImage(imageInputRef.current.files[0], token);
        console.log(imageReponse);
        const newArticle = {title, perex, content, imageId: imageReponse.imageId };
        console.log(newArticle);
        await publishArticle(newArticle, token);
        router.push('/articles');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-wrap">
      <div className="flex-1 border-4 m-5 p-5">
        <input
          type="text"
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
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="file-input file-input-primary"
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
