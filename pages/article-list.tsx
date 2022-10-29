import Link from "next/link"

export default function ArticleList() {
  return (
    <>
      <h1>Article list</h1>
      <h2><Link href="/article">Go to article</Link></h2>
      <h2><Link href="/">Go home</Link></h2>
    </>
  )
}