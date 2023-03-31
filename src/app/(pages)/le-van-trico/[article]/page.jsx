import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import HeroBanner from '@/app/components/HeroBanner';
import Return from '@/app/components/Return';
import Slideshow from '@/app/components/Slideshow';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

function processImage(contentParam) {
  // Ajoute l'URL du backend
  return contentParam.replaceAll(
    '/uploads',
    `${process.env.STRAPI_URL}/uploads`
  );
}

async function getArticle(params) {
  const { article } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/article/${article}?populate=*`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Article({ params }) {
  const data = await getArticle(params);
  const article = data.data.attributes;
  const picturesSlideshow = article.slideshow.data;
  const arrayOfPictures = [];
  if (picturesSlideshow != null) {
    for (let picture of picturesSlideshow) {
      arrayOfPictures.push(
        `${process.env.STRAPI_URL}${picture.attributes.url}`
      );
    }
  }
  return (
    <main>
      <HeroBanner
        style="v2"
        ariane={
          <div>
            <Link href="/le-van-trico">Le van Trico</Link>
            <span> / </span>
            <Link href={`/le-van-trico/${article.slug}`}>{article.title}</Link>
          </div>
        }
        title={article.title}
        cover={article.cover.data.attributes.url}
        date={article.date}
      />
      <section className="article-content">
        <MDXRemote source={processImage(article.content)} />
        <Slideshow picture={arrayOfPictures} />
      </section>
      <Return title="Le van Trico" link="/le-van-trico" />
    </main>
  );
}
