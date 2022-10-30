import axios from "axios"
import { Article, ArticleData, ArticleDetail } from "./types";

const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
});

export async function getArticles(): Promise<Array<Article>> {
  const response = await axiosInstance.get('/articles');
  return response.data.items;
}

export async function getArticleIds(): Promise<Array<string>> {
  const articles = await getArticles();
  console.log(articles);
  return articles.map(article => article.articleId);
}

export async function getArticleDetail(articleId: string): Promise<ArticleDetail> {
  const response = await axiosInstance.get(`/articles/${articleId}`);
  const articleDetail: ArticleDetail = response.data;  
  return response.data;
}

export const getImageURL = async (imageId: string): Promise<string> => {
  const response = await axiosInstance.get(`/images/${imageId}`, {responseType: 'blob'});
  const imageBlob = new Blob([response.data]);
  return URL.createObjectURL(imageBlob);
}

export const getArticleData = async (articleId: string): Promise<ArticleData> => {
  const articleDetail = await getArticleDetail(articleId);
  const imageURL = await getImageURL(articleDetail.imageId);
  return { ...articleDetail, imageURL };
}
