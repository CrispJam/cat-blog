export interface Article {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
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

export interface ArticleData extends ArticleDetail {
  imageURL: string;
}
