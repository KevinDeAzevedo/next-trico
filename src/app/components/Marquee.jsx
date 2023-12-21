/* eslint-disable react/jsx-no-comment-textnodes */
import Link from 'next/link';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getNews() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/news?sort=publishedAt:desc`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Marquee() {
  const data = await getNews();
  const news = data.data;
  const lastNews = news[0];
  return (
    <div className="marquee">
      <div className="marquee-group">
        <p>
          <Link href={`/news/${lastNews.id}`} className="marquee-group-title">
            <strong>// Breaking News : </strong>
            {lastNews.title}
          </Link>
        </p>
        <p>
          <Link href={`/news/${lastNews.id}`} className="marquee-group-title">
            <strong>// Breaking News : </strong>
            {lastNews.title}
          </Link>
        </p>
      </div>
    </div>
  );
}
