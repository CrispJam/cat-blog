import Link from 'next/link';
import Image from 'next/image';
import { getArticleDetail, getArticleIds, getImageURL } from '../../lib/api';
import { ArticleDetail } from '../../lib/types';
import ReactMarkdown from 'react-markdown';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ArticleView() {
  const router = useRouter();
  const { articleId } = router.query;
  console.log(articleId);
  return (
    <>
      <h1>Article</h1>
      <h2>
        <Link href="/article-list">Back to article list</Link>
      </h2>
    </>
  );
}
