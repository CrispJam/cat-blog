import axios from "axios"
import { Article } from "./types";

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

export async function getArticleDetail(articleId: string) {
  const response = await axiosInstance.get(`/articles/${articleId}`);
  return response.data;
}
