import Link from "next/link"
import Image from "next/image";
import { Article } from "../lib/types";
import { getArticles } from "../lib/api";

interface ArticleListProp {
  articles: Array<Article>;
}

export default function ArticleList({articles}: ArticleListProp) {
  console.log(articles);
  const articleComponents = articles.map(article =>
    <div key={article.title}>
      <h2 >{article.title}</h2>
      <Image alt={article.title} src={article.imageURL} width="200" height="200" />
      <p>{article.perex}</p>
      <Link href={`/articles/${encodeURIComponent(article.articleId)}`}>Read more</Link>
    </div>
  )
  return (
    <>
      <h1>Recent articles</h1>
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