/* eslint-disable @next/next/no-img-element */
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

export default async function News() {
  const data = await getNews();
  const news = data.data;
  return (
    <main>
      <h1>News</h1>
      <ul>
        {news
          .map((post, index) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
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
