/* eslint-disable @next/next/no-img-element */
import When from '../../components/When';
import BotButton from '../../components/BotButton';
import Comment from '../../components/Comment';
import Pagination from '../../components/Pagination';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getNews(nbPage) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/news?pagination[page]=${nbPage}&sort=publishedAt:desc&&populate=*`,
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

export default async function News({ searchParams }) {
  // Check if searchParams is Empty
  if (
    Object.keys(searchParams).length === 0 &&
    searchParams.constructor === Object
  ) {
    redirect('/news?page=1'); // Force redirection when URL hits '/blog'
  }

  const numberPage = searchParams.page;
  const data = await getNews(numberPage);
  const paginationData = data.meta.pagination; // get number of page(s)
  const news = data.data;
  const page = await getPage();

  return (
    <main>
      <div className="hero-news">
        <h1>{page.data.title}</h1>
        <BotButton link="#list" ui="-tiny" />
      </div>
      {news.length != 0 ? (
        <section id="list" className="news-list">
          {news.map((post, index) => (
            <Link key={post.id} className="news-card" href={`/news/${post.id}`}>
              <div className="news-card-content">
                <h2>{post.title}</h2>
                <When date={post.date} />
              </div>
              <img
                src={`${process.env.STRAPI_URL}${post.cover.data.formats.medium.url}`}
                alt="Couverture de la news"
              />
            </Link>
          ))}
        </section>
      ) : (
        redirect('/news?page=1')
      )}

      <Pagination paginationData={paginationData} />
      <Comment
        url={`${process.env.SITE_URL}/News`}
        id="Breaking-news"
        title="Breaking News"
      />
    </main>
  );
}
