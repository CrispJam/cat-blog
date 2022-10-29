import Link from "next/link"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
});

export default function ArticleList({articles}) {
  return (
    <>
      <h1>Article list</h1>
      {articles.map(article => <h2 key={article.title}>{article.title}</h2>)}
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