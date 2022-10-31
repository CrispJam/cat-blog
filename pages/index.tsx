import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cat Blog</title>
        <meta name="description" content="Everything you wanted to know about cats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 >
          Welcome to cat blog
        </h1>

        <p>
          <Link href="/articles">Go to article list</Link>
        </p>
      </main>
    </div>
  )
}
