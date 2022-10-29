import Link from 'next/link';
import { getArticleDetail, getArticleIds } from '../../lib/api';
import { ArticleDetail } from '../../lib/types';
import ReactMarkdown from 'react-markdown';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';

interface Props {
  articleDetail: ArticleDetail;
}

interface Params extends ParsedUrlQuery {
  articleId: string;
}

export default function ArticleView({articleDetail}: Props) {
  return (
    <>
      <h1>{articleDetail.title}</h1>
      <ReactMarkdown>{articleDetail.content}</ReactMarkdown>
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
  return {
    props: { articleDetail }
  }
}
