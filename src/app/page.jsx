/* eslint-disable @next/next/no-img-element */
import BotButton from './components/BotButton';
import PostCard from './components/PostCard';
import Status from './components/Status';
import Button from './components/Button';

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
  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-01">
          <div className="home-hero-01-heading">
            <h1>{page.firstTitle}</h1>
            <Button name="Carnet de route" link="/carnet-de-route" />
          </div>
          <div className="home-hero-image">
            {/* <video autoPlay muted loop>
              <source
                src={`${process.env.STRAPI_URL}${page.firstCover.data.url}`}
                type="video/webm"
              />
            </video> */}
            <img
              src={`${process.env.STRAPI_URL}${page.firstCover.data.url}`}
              alt=""
            />
          </div>
        </div>
        <div className="home-hero-02">
          <div className="home-hero-image">
            {/* <video autoPlay muted loop>
              <source
                src={`${process.env.STRAPI_URL}${page.secondCover.data.url}`}
                type="video/webm"
              />
            </video> */}
            <img
              src={`${process.env.STRAPI_URL}${page.secondCover.data.url}`}
              alt=""
            />
          </div>
          <p>{carnetIntro}</p>
        </div>
        <div className="home-hero-03">
          <div className="home-hero-image">
            {/* <video autoPlay muted loop>
              <source
                src={`${process.env.STRAPI_URL}${page.thirdCover.data.url}`}
                type="video/webm"
              />
            </video> */}
            <img
              src={`${process.env.STRAPI_URL}${page.thirdCover.data.url}`}
              alt=""
            />
          </div>
          <div className="home-hero-03-button">
            <BotButton link="#fabrication-du-van-trico" ui="-big" />
          </div>
        </div>
      </section>
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
