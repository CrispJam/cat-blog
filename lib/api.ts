import axios from "axios"
import { ArticleType } from "./types";

const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
});

export async function getArticles(): Promise<Array<ArticleType>> {
  const response = await axiosInstance.get('/articles');
  return response.data.items;
}

export async function getArticleIds() {
  const articles = await getArticles();
  articles.map(article => article.articleId)
}
