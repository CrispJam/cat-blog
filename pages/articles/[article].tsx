import Link from 'next/link';
import { getArticleIds } from '../../lib/api';

export default function Article() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getArticleIds();
  return {
    paths,
    fallback: false,
  };
}
