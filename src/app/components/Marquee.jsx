import Link from 'next/link';

async function getNews() {
  const res = await fetch('http://localhost:1337/api/news', {
    cache: 'no-store',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Marquee() {
  const data = await getNews();
  const news = data.data;
  const lastNews = news.slice(-1);
  return (
    <>
      <p>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <span>// Breaking News : </span>
        {lastNews.map((item, index) => (
          <span key={item.id}>{item.title} </span>
        ))}
        <Link href="/news">Plus d&apos;infos</Link>
      </p>
    </>
  );
}
