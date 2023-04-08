/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import BotButton from '../../components/BotButton';
import lefttruck from '../../assets/Left-truck.webp';
import righttruck from '../../assets/Right-truck.webp';
import biggribouille from '../../assets/Big-gribouille.webp';
import Button from '../../components/Button';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

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

async function getCarnet() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/carnet?populate=*`,
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
  const data = await getCarnet();
  const seoData = data.data.seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: true,
    },
  };
}

export default async function Carnet() {
  const data = await getCountries();
  const countries = data.data;
  const carnet = await getCarnet();
  const page = carnet.data;
  return (
    <main>
      <section className="hero">
        <h1>{page.title}</h1>
        <BotButton link="#list" ui="-tiny" />
      </section>
      <section id="list">
        <ul className="countries">
          {countries.map((country, index) => (
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
                    src={`${process.env.STRAPI_URL}${country.cover.data.url}`}
                    alt="Cover du pays"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="trico-catchy">
        <div className="trico-catchy-left">
          <div className="trico-catchy-left-image">
            <Image src={lefttruck} alt="" />
          </div>
        </div>
        <div className="trico-catchy-right">
          <div className="trico-catchy-right-image">
            <Image src={righttruck} alt="" />
          </div>
        </div>
        <div className="trico-catchy-center">
          <Image
            className="trico-catchy-center-gribouille"
            src={biggribouille}
            alt=""
          />
          <div className="trico-catchy-center-title">
            <h2>La fabrication du van</h2>
          </div>
          <div className="trico-catchy-center-button">
            <Button name="Voir ici" link="/le-van-trico" />
          </div>
        </div>
      </section>
    </main>
  );
}
