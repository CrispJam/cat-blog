import axios from "axios"
import { Article, ArticleDetail, BaseArticle, Credentials, ImageResponse, NewArticle } from "./types";

const axiosInstance = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz',
  headers: { 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }
});

export async function getArticles(): Promise<Array<Article>> {
  const response = await axiosInstance.get('/articles');
  const baseArticles: Array<BaseArticle> = response.data.items;
  const articles = await Promise.all(baseArticles.map(async baseArticle => {
    const imageURL = baseArticle.imageId ? await getImageURL(baseArticle.imageId) : "/images/kitten.jpg";
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

export const uploadImage = async (image: File, access_token: string): Promise<ImageResponse> => {
  const payload = new FormData();
  payload.append('image', image);
  const response = await axiosInstance.post('/images', payload, {headers: {'Content-Type': 'multipart/form-data', 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8', 'Authorization': access_token}})
  // Supporting only a single image right now
  return response.data[0];
}

export const publishArticle = async (article: NewArticle, access_token: string) => {
  const payload = JSON.stringify(article);
  await axiosInstance.post('/articles', payload, { headers: {'Content-Type': 'application/json', 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8', 'Authorization': access_token}})
}

export async function getArticleDetail(articleId: string): Promise<ArticleDetail> {
  const response = await axiosInstance.get(`/articles/${articleId}`);
  const imageURL = await getImageURL(response.data.imageId)
  return { ...response.data, imageURL }
}

export async function login(credentials: Credentials) {
  const payload = JSON.stringify(credentials);
  const response = await axiosInstance.post('/login', payload, {headers: { 'Content-Type': 'application/json', 'X-API-KEY': '950a7a91-9435-4179-b89f-3944c2f128f8' }});
  return response.data;
}
