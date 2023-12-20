/* eslint-disable @next/next/no-img-element */
import { MDXRemote } from 'next-mdx-remote/rsc';
import When from '../../../components/When';
import Comment from '../../../components/Comment';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getArticle(params) {
  const { article } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/news/${article}?populate=*`,
    options
  );
  if (!res.ok) {
    redirect('/not-found');
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
export async function generateMetadata({ params }) {
  const article = await getArticle(params);
  return {
    title: article.data.title,
    description: article.data.content.substring(0, 170),
    robots: {
      index: true,
    },
  };
}

export default async function Article({ params }) {
  const article = await getArticle(params);
  return (
    <main>
      <div className="news-article">
        <div className="news-article-content">
          <Link href="/news" className="news-article-content-backbtn">
            Voir toutes les News
          </Link>
          <When date={article.data.date} />
          <h1>{article.data.title}</h1>
          <MDXRemote source={processImage(article.data.content)} />
        </div>
        <div className="news-article-image">
          <img
            src={`${process.env.STRAPI_URL}${article.data.cover.data.formats.large.url}`}
            alt="Couverture de la news"
          />
        </div>
      </div>
      <Comment
        url={`${process.env.SITE_URL}/News/${article.data.id}`}
        id={article.data.id}
        title={`Breaking News of ${article.data.id}`}
      />
    </main>
  );
}