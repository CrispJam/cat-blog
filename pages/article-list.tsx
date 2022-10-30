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
    // const axiosInstance = axios.create({
    //   baseURL: 'https://fullstack.exercise.applifting.cz',
    //   headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
    // });
    // const getImage = async () => {
    //   const response = await axiosInstance.get('/images/e7ae6fa9-c22e-497e-b659-d20e50af978f', {responseType: 'blob'});
    //   const myBlob = new Blob([response.data]);
    //   const imgURL = URL.createObjectURL(myBlob);
    //   console.log(imgURL)
    //   setImgSrc(imgURL);
    //   // console.log(response.data);
    //   //console.log(Buffer.from(response.data).toString('base64'));
    //   // setImgSrc(`data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`);
    // }
    // getImage();
  }, [])

  const articleComponents = articles.map(article =>
    <div key={article.title}>
      <h2 >{article.title}</h2>
      <p>{article.perex}</p>
      <Link href={`/articles/${article.articleId}`}>Read more</Link>
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