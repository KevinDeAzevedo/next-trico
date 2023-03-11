/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/fr';

async function getHomepage() {
  const res = await fetch('http://localhost:1337/api/homepage?populate=*');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getCarnet() {
  const res = await fetch('http://localhost:1337/api/carnet');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getTrico() {
  const res = await fetch('http://localhost:1337/api/trico');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getArticles() {
  const res = await fetch('http://localhost:1337/api/articles');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

function getDate(prop) {
  const date = moment(prop);
  return date.locale('fr').format('LL');
}

export default async function Home() {
  const data = await getHomepage();
  const page = data.data;
  const covers = page.images.data;
  const carnet = await getCarnet();
  const carnetIntro = carnet.data.intro;
  const trico = await getTrico();
  const tricoIsfinished = trico.data.isFinished;
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
              src={`http://localhost:1337${item.url}`}
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
        {tricoIsfinished ? <p>Finalisé</p> : <p>En cours</p>}
        <p>{tricoIntro}</p>
        <Link href="/le-van-trico">Le van Trico</Link>
        <ul>
          {lastsArticles.map((article, index) => (
            <li key={article.id}>
              <p>{getDate(article.date)}</p>
              <h3>{article.title}</h3>
              <p>{article.intro}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
