export type ArticleType = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export type Comment = {
  commendId: string;
  articleId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
}

export type ArticleDetail = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
  content: string;
  comments: Array<Comment>
}
