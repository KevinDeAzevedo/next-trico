/* eslint-disable @next/next/no-img-element */
import BotButton from './components/BotButton';
import PostCard from './components/PostCard';
import Status from './components/Status';
import Button from './components/Button';
import Link from 'next/link';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getHomepage() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/homepage?populate=*`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getCarnet() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/carnet`, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getTrico() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/trico`, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getArticles() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/articles?populate=*`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getCountries() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/countries?populate=*`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// SEO ZONE
export async function generateMetadata() {
  const data = await getHomepage();
  const seoData = data.data.seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: true,
    },
  };
}

export default async function Home() {
  const data = await getHomepage();
  const page = data.data;
  const avatar = page.avatar.data;
  const carnet = await getCarnet();
  const carnetIntro = carnet.data.intro;
  const trico = await getTrico();
  const tricoIntro = trico.data.intro;
  const articles = await getArticles();
  const lastsArticles = articles.data.slice(-2);
  const countries = await getCountries();
  return (
    <main>
      {/* hero video banner */}
      <section className="wide-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/poster/pyrennee.webp"
        >
          <source src="/videos/mp4/pyrennee.mp4" type="video/mp4" />
          <source src="/videos/webm/pyrennee.webm" type="video/webm" />
        </video>
        <div className="wide-hero-content">
          <p>Trico on the Road</p>
          <h1>{page.firstTitle}</h1>
          <p>{carnetIntro}</p>
        </div>
      </section>
      <section id="list" className="carnets">
        <h2>Carnet de route</h2>
        <ul className="countries">
          {countries.data.map((country, index) => (
            <li key={country.id} className="country">
              <Link href={`/carnet-de-route/${country.slug}`}>
                <div className="country-greeting">
                  <p>{country.greeting}</p>
                </div>
                <div className="country-name">
                  <Button name={country.name} />
                </div>
                <div className="country-image">
                  <img
                    src={`${process.env.STRAPI_URL}${country.cover.data.formats.medium.url}`}
                    alt="Cover du pays"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {/* Trico fabrication */}
      <section id="fabrication-du-van-trico" className="van-trico">
        <div className="van-trico-heading">
          <h2>{page.secondTitle}</h2>
          <Status status={trico.data.isFinished} />
          <p>{tricoIntro}</p>
          <Button name="Le van Trico" link="/le-van-trico" />
        </div>
        <div>
          <ul className="van-trico-list">
            {lastsArticles.map((article, index) => (
              <li key={article.id}>
                <PostCard
                  date={article.date}
                  title={article.title}
                  link={`/le-van-trico/${article.slug}`}
                  intro={article.intro}
                  cover={article.cover.data.formats.medium.url}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* About us */}
      <section className="a-propos">
        <div className="a-propos-title">
          <h2>{page.thirdTitle}</h2>
        </div>
        <div className="a-propos-image">
          <img
            className="avatarhome"
            src={`${process.env.STRAPI_URL}${avatar.url}`}
            alt="Avatar Kévin et Célestine"
          />
        </div>
        <div className="a-propos-content">
          <p>{page.aboutUs}</p>
          <Button name="Se contacter" link="/contact" />
        </div>
      </section>
    </main>
  );
}
