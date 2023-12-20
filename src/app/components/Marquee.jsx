/* eslint-disable react/jsx-no-comment-textnodes */
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
      <div className="marquee-group">
        <p>
          {lastNews.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="marquee-group-title"
            >
              <strong>// Breaking News : </strong>
              {item.title}
            </Link>
          ))}
        </p>
        <p aria-hidden="true">
          {lastNews.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="marquee-group-title"
            >
              <strong>// Breaking News : </strong>
              {item.title}
            </Link>
          ))}
        </p>
      </div>
    </div>
  );
}
