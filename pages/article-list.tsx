import Link from "next/link"
import axios from "axios"
import { ArticleType } from "../lib/types";

type ArticleListProp = {
  articles: Array<ArticleType>;
}

const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
});

export default function ArticleList({articles}: ArticleListProp) {
  const articleComponents = articles.map(article =>
    <div key={article.title}>
      <h2 >{article.title}</h2>
      <p>{article.perex}</p>
      <Link href="/">Read more</Link>
    </div>  
  )
  return (
    <>
      <h1>Recent articles</h1>
      {articleComponents}
      <h2><Link href="/">Go home</Link></h2>
    </>
  )
}

export async function getStaticProps() {
  const response = await axiosInstance.get('/articles');
  return {
    props: {
      articles: response.data.items,
    },
  }
}