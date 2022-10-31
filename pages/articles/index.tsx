import Link from "next/link"
import Image from "next/image";
import { getArticles } from "../../lib/api";
import useSWR from 'swr';

export default function ArticleList() {
  // No need to pass the key string to getArticles
  const { data, error } = useSWR('article-list', () => getArticles());

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  
  const articleComponents = data.map(article =>
    <div key={article.title}>
      <h2 >{article.title}</h2>
      <Image alt={article.title} src={article.imageURL} width="200" height="200" />
      <p>{article.perex}</p>
      <Link href={`/articles/${encodeURIComponent(article.articleId)}`}>Read more</Link>
    </div>
  )
  return (
    <>
      <h1 className="text-3xl font-bold underline">Recent articles</h1>
      {articleComponents}
      <h2><Link href="/">Go home</Link></h2>
    </>
  )
}
