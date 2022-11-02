export interface NewArticle {
  title: string;
  perex: string;
  content: string;
  imageId: string;
}

export interface BaseArticle {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface Article extends BaseArticle {
  imageURL: string;
}

export interface Comment {
  commendId: string;
  articleId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
}

export interface ArticleDetail extends Article {
  content: string;
  comments: Array<Comment>;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface ImageResponse {
  imageId: string;
  name: string;
}
