import Link from "next/link"
import Image from "next/image";
import { Article } from "../lib/types";
import { getArticles, getImageURL } from "../lib/api";
import { useEffect, useState } from "react";
import axios from "axios";

interface ArticleListProp {
  articles: Array<Article>;
}

export default function ArticleList({articles}: ArticleListProp) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    const setupImage = async () => {
      const imgURL = await getImageURL('e7ae6fa9-c22e-497e-b659-d20e50af978f');
      console.log(imgURL);
      setImgSrc(imgURL);
    }
    setupImage();
  }, [])

  const articleComponents = articles.map(article =>
    <div key={article.title}>
      <h2 >{article.title}</h2>
      <p>{article.perex}</p>
      <Link href={`/articles/${encodeURIComponent(article.articleId)}`}>Read more</Link>
    </div>
  )
  return (
    <>
      <h1>Recent articles</h1>
      <Image alt="test" src={imgSrc} width="500" height="500" />
      {articleComponents}
      <h2><Link href="/">Go home</Link></h2>
    </>
  )
}

export async function getStaticProps() {
  const articles = await getArticles();
  return {
    props: {
      articles,
    },
  }
}