import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getArticles() {
  const res = await fetch(`http://localhost:1337/api/articles`, {
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
  console.log(articles);
  return (
    <main>
      <h1>Fabrication du van Trico</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={article.id}>
            <Link href={`/le-van-trico/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
