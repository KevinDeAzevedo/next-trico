import Link from 'next/link';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getNews() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/news`, options);
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
    <div className="marquee">
      <p>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <span>
          <strong>// Breaking News : </strong>
        </span>
        {lastNews.map((item, index) => (
          <span key={item.id}>{item.title} </span>
        ))}
        <Link href="/news">Plus d&apos;infos</Link>
      </p>
    </div>
  );
}
