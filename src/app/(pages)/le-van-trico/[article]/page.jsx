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
  return (
    <main>
      <h1>{article.title}</h1>
      {/* <HeroBanner
        countryname={country.name}
        cover={country.cover.data.attributes.url}
        countryslug={country.slug}
        botbutton={true}
      /> */}
      <Link href="/le-van-trico">Retour : Le van Trico</Link>
    </main>
  );
}
