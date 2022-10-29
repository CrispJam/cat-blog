import Link from 'next/link';
import { getArticleDetail, getArticleIds } from '../../lib/api';
import { ArticleDetail } from '../../lib/types';

interface ArticleDetailProp {
  articleDetail: ArticleDetail;
}

export default function ArticleView({articleDetail}: ArticleDetailProp) {
  return (
    <>
      <h1>{articleDetail.title}</h1>
      <p>{articleDetail.content}</p>
      <h2>
        <Link href="/">Back to home</Link>
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
export async function getStaticProps({ params }) {
  const articleDetail = await getArticleDetail(params.articleId);
  return {
    props: {
      articleDetail,
    }
  }
}
