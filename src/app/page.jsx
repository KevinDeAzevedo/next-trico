/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import When from './components/When';

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

export default async function Home() {
  const data = await getHomepage();
  const page = data.data;
  const covers = page.images.data;
  const avatar = page.avatar.data;
  const carnet = await getCarnet();
  const carnetIntro = carnet.data.intro;
  const trico = await getTrico();
  const tricoIntro = trico.data.intro;
  const articles = await getArticles();
  const lastsArticles = articles.data.slice(-2);
  return (
    <main>
      <section>
        <h1>{page.firstTitle}</h1>
        <Link href="/carnet-de-route">Carnet de route</Link>
        <div>
          {covers.map((item, index) => (
            <img
              src={`${process.env.STRAPI_URL}${item.url}`}
              alt="Paysage"
              id={`cover-${index}`}
              key={item.id}
            />
          ))}
        </div>
        <p>{carnetIntro}</p>
      </section>
      <section>
        <h2>{page.secondTitle}</h2>
        {trico.data.isFinished ? <p>Finalisé</p> : <p>En cours</p>}
        <p>{tricoIntro}</p>
        <Link href="/le-van-trico">Le van Trico</Link>
        <ul>
          {lastsArticles.map((article, index) => (
            <li key={article.id}>
              <When date={article.date} />
              <h3>{article.title}</h3>
              <Link href={`/le-van-trico/${article.slug}`}>Voir plus</Link>
              <p>{article.intro}</p>
              <img
                src={`${process.env.STRAPI_URL}${article.cover.data.url}`}
                alt="Couverture d'article"
                id={`last-articles-${index}`}
              />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{page.thirdTitle}</h2>
        <img
          className="avatarhome"
          src={`${process.env.STRAPI_URL}${avatar.url}`}
          alt="Avatar Kévin et Célestine"
        />
        <p>{page.aboutUs}</p>
        <Link href="/contact">Se Contacter</Link>
      </section>
    </main>
  );
}
