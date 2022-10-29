import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from "react"

const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
});

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      const response = await axiosInstance.get('/articles');
      console.log(response.data.items);
      setArticles(response.data.items)
    }
    getArticles();
  }, [])

  return (
    <>
      <h1>Article list</h1>
      {articles.map(article => <h2 key={article.title}>{article.title}</h2>)}
      <h2><Link href="/">Go home</Link></h2>
    </>
  )
}