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
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-hero-content-name">Trico on the Road</p>
          <h1>{page.firstTitle}</h1>
          <Button name="Carnet de route" link="/carnet-de-route" />
        </div>
        <div className="home-hero-videos">
          <div className="home-hero-videos-card" id="video01">
            <video autoPlay muted loop playsInline>
              <source src="/videos/mp4/motion01.mp4" type="video/mp4" />
              <source src="/videos/webm/motion01.webm" type="video/webm" />
            </video>
          </div>
          <div className="home-hero-videos-card" id="video02">
            <video autoPlay muted loop playsInline>
              <source src="/videos/mp4/motion02.mp4" type="video/mp4" />
              <source src="/videos/webm/motion02.webm" type="video/webm" />
            </video>
          </div>
          <div className="home-hero-videos-card" id="video03">
            <video autoPlay muted loop playsInline>
              <source src="/videos/mp4/motion03.mp4" type="video/mp4" />
              <source src="/videos/webm/motion03.webm" type="video/webm" />
            </video>
          </div>
        </div>
        <div className="home-hero-content">
          <p>{carnetIntro}</p>
        </div>
        <div className="bot-button">
          <BotButton link="#fabrication-du-van-trico" ui="-big" />
        </div>
      </section>
      <section id="list">
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
      <section id="fabrication-du-van-trico" className="secondpart">
        <div className="secondpart-heading">
          <h2>{page.secondTitle}</h2>
          <Status status={trico.data.isFinished} />
          <p>{tricoIntro}</p>
          <Button name="Le van Trico" link="/le-van-trico" />
        </div>
        <div>
          <ul className="secondpart-list">
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
      <section className="thirdpart">
        <div className="thirdpart-title">
          <h2>{page.thirdTitle}</h2>
        </div>
        <div className="thirdpart-image">
          <img
            className="avatarhome"
            src={`${process.env.STRAPI_URL}${avatar.url}`}
            alt="Avatar Kévin et Célestine"
          />
        </div>
        <div className="thirdpart-content">
          <p>{page.aboutUs}</p>
          <Button name="Se contacter" link="/contact" />
        </div>
      </section>
    </main>
  );
}
