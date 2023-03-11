import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getArticle(params) {
  const { article } = params;
  const res = await fetch(
    `http://localhost:1337/api/slugify/slugs/article/${article}?populate=*`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Article({ params }) {
  const data = await getArticle(params);
  const article = data.data.attributes;
  console.log(article);
  return (
    <main>
      <h1>{article.title}</h1>
      <Link href="/le-van-trico">Retour : Le van Trico</Link>
    </main>
  );
}
