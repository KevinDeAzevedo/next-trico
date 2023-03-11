/* eslint-disable @next/next/no-img-element */
import { MDXRemote } from 'next-mdx-remote/rsc';
import When from '../../components/When';

async function getNews() {
  const res = await fetch('http://localhost:1337/api/news?populate=*', {
    cache: 'no-store',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getPage() {
  const res = await fetch('http://localhost:1337/api/newspage', {
    cache: 'no-store',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

function processImage(contentParam) {
  // Ajoute l'URL du backend
  return contentParam.replaceAll('/uploads', 'http://localhost:1337/uploads');
}

export default async function News() {
  const data = await getNews();
  const news = data.data;
  const page = await getPage();
  return (
    <main>
      <h1>{page.data.title}</h1>
      <ul>
        {news
          .map((post, index) => (
            <li key={post.id}>
              <When date={post.date} />
              <h2>{post.title}</h2>
              <MDXRemote source={processImage(post.content)} />
              <img
                className="img-post"
                src={`http://localhost:1337${post.cover.data.url}`}
                alt="Couverture de la news"
              />
            </li>
          ))
          .reverse()}
      </ul>
    </main>
  );
}
