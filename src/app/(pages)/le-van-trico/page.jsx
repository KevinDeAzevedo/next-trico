/* eslint-disable @next/next/no-img-element */
import { notFound } from 'next/navigation';
import PostCard from '../../components/PostCard';
import Status from '../../components/Status';
import BotButton from '../../components/BotButton';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getArticles() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/articles?populate=*`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

async function getTrico() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/trico?populate=*`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

// SEO ZONE
export async function generateMetadata() {
  const data = await getTrico();
  const seoData = data.data.seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: true,
    },
  };
}

export default async function Trico() {
  const data = await getArticles();
  const articles = data.data;
  const trico = await getTrico();
  const page = trico.data;
  const hero = page.image.data;
  return (
    <main>
      <div className="trico-hero">
        <h1>{page.title}</h1>
        <Status status={page.isFinished} />
        <div className="trico-hero-image">
          <img
            src={`${process.env.STRAPI_URL}${hero.url}`}
            alt="Bandeau principal"
          />
        </div>
        <BotButton link="#list" ui="-tiny" />
      </div>
      <section id="list">
        <ul className="list">
          {articles.map((item, index) => (
            <li key={item.id} className="list-post">
              <PostCard
                date={item.date}
                title={item.title}
                link={`/le-van-trico/${item.slug}`}
                intro={item.intro}
                cover={item.cover.data.url}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
