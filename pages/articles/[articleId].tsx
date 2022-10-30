import Link from 'next/link';
import Image from 'next/image';
import { getArticleDetail, getArticleIds, getImageURL } from '../../lib/api';
import { ArticleDetail } from '../../lib/types';
import ReactMarkdown from 'react-markdown';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import axios from "axios"


interface Props {
  articleDetail: ArticleDetail;
  articleImageURL: string;
}

interface Params extends ParsedUrlQuery {
  articleId: string;
}

export default function ArticleView({articleDetail, articleImageURL}: Props) {
  // const [imgSrc, setImgSrc] = useState('');
  // useEffect(() => {
  //   const axiosInstance = axios.create({
  //     baseURL: 'https://fullstack.exercise.applifting.cz',
  //     headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
  //   });
  //   const getImage = async () => {
  //     const response = await axiosInstance.get('/images/e7ae6fa9-c22e-497e-b659-d20e50af978f');
  //     const blob = new Blob([response.data], {type: 'image/jpeg'});
  //     const imgURL = URL.createObjectURL(blob);
  //     console.log(imgURL)
  //     setImgSrc(imgURL);
  //     // console.log(response.data);
  //     //console.log(Buffer.from(response.data).toString('base64'));
  //     // setImgSrc(`data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`);
  //   }
  //   getImage();
  // }, [])

  console.log(articleDetail);
  console.log(articleImageURL);
  return (
    <>
      <h1>{articleDetail.title}</h1>
      <ReactMarkdown>{articleDetail.content}</ReactMarkdown>
      {
      <Image alt="test" src={articleImageURL} width="500" height="500" />
      }
      <h2>
        <Link href="/article-list">Back to article list</Link>
      </h2>
    </>
  );
}

export async function getStaticPaths() {
  const articleIds = await getArticleIds();
  const paths = articleIds.map(articleId => {
    return {
      params: {
        articleId,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
// 
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const params = context.params!  // ! is a non-null assertion 
  const articleDetail = await getArticleDetail(params.articleId);
  const articleImageURL = await getImageURL(articleDetail.imageId);
  return {
    props: { articleDetail, articleImageURL }
  }
}
