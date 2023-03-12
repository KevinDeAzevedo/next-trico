import Link from 'next/link';
import { notFound } from 'next/navigation';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getArticle(params) {
  const { article } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/article/${article}?populate=*`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Article({ params }) {
  const data = await getArticle(params);
  const article = data.data.attributes;
  return (
    <main>
      <h1>{article.title}</h1>
      <Link href="/le-van-trico">Retour : Le van Trico</Link>
    </main>
  );
}
