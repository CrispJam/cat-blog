import axios from "axios"
import { Article, ArticleDetail, BaseArticle } from "./types";

const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
});

export async function getArticles(): Promise<Array<Article>> {
  const response = await axiosInstance.get('/articles');
  const baseArticles: Array<BaseArticle> = response.data.items;
  const articles = await Promise.all(baseArticles.map(async baseArticle => {
    const imageURL = await getImageURL(baseArticle.imageId);
    return { ...baseArticle, imageURL };
  }));
  return articles;
}

export async function getArticleIds(): Promise<Array<string>> {
  const articles = await getArticles();
  console.log(articles);
  return articles.map(article => article.articleId);
}


export const getImageURL = async (imageId: string): Promise<string> => {
  const response = await axiosInstance.get(`/images/${imageId}`, {responseType: 'blob'});
  const imageBlob = new Blob([response.data]);
  return URL.createObjectURL(imageBlob);
}

export async function getArticleDetail(articleId: string): Promise<ArticleDetail> {
  const response = await axiosInstance.get(`/articles/${articleId}`);
  const imageURL = await getImageURL(response.data.imageId)
  return { ...response.data, imageURL }
}
