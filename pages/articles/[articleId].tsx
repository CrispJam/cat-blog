import Link from 'next/link';
import Image from 'next/image';
import { getArticleDetail } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function ArticleView() {
  const router = useRouter();
  const { articleId } = router.query;
  const { data, error } = useSWR(articleId, getArticleDetail)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <h1>{data.title}</h1>
      <Image alt={data.title} src={data.imageURL} width="200" height="200"/>
      <ReactMarkdown>{data.content}</ReactMarkdown>
      <h2>
        <Link href="/articles">Back to article list</Link>
      </h2>
    </>
  );
}
