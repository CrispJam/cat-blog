import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cat Blog</title>
        <meta name="description" content="Everything you wanted to know about cats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to cat blog
        </h1>

        <p className={styles.description}>
          <Link href="/article-list">Go to article list</Link>
        </p>
      </main>
    </div>
  )
}
