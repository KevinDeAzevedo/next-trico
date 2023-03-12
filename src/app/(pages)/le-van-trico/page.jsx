/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getArticles() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/articles`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

async function getTrico() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/trico?populate=*`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Trico() {
  const data = await getArticles();
  const articles = data.data;
  const trico = await getTrico();
  const page = trico.data;
  const hero = page.image.data;
  return (
    <main>
      <h1>{page.title}</h1>
      {page.isFinished ? <p>Finalisé</p> : <p>En cours</p>}
      <ul>
        <img
          className="herotrico"
          src={`${process.env.STRAPI_URL}${hero.url}`}
          alt="Bandeau principal"
        />
        {articles.map((article, index) => (
          <li key={article.id}>
            <Link href={`/le-van-trico/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
