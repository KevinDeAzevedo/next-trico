/* eslint-disable @next/next/no-img-element */
import { MDXRemote } from 'next-mdx-remote/rsc';
import When from '../../components/When';
import BotButton from '../../components/BotButton';
import Comment from '../../components/Comment';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getNews() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/news?populate=*`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getPage() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/newspage?populate=*`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

function processImage(contentParam) {
  // Ajoute l'URL du backend
  return contentParam.replaceAll(
    '/uploads',
    `${process.env.STRAPI_URL}/uploads`
  );
}

// SEO ZONE
export async function generateMetadata() {
  const data = await getPage();
  const seoData = data.data.seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: true,
    },
  };
}

export default async function News() {
  const data = await getNews();
  const news = data.data;
  const page = await getPage();
  return (
    <main>
      <div className="hero-news">
        <h1>{page.data.title}</h1>
        <BotButton link="#list" ui="-tiny" />
      </div>
      <section id="list" className="news-list">
        <ul>
          {news
            .map((post, index) => (
              <li key={post.id} className="news-card">
                <div className="news-card-title">
                  <When date={post.date} />
                  <h2>{post.title}</h2>
                </div>
                <div className="news-card-content">
                  <div className="news-card-content-image">
                    <img
                      src={`${process.env.STRAPI_URL}${post.cover.data.formats.medium.url}`}
                      alt="Couverture de la news"
                    />
                  </div>
                  <div className="news-card-content-text">
                    <MDXRemote source={processImage(post.content)} />
                  </div>
                </div>
              </li>
            ))
            .reverse()}
        </ul>
        <Comment
          url={`${process.env.SITE_URL}/News`}
          id="Breaking-news"
          title="Breaking News"
        />
      </section>
    </main>
  );
}
