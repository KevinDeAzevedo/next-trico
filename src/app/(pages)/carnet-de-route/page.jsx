/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import BotButton from '@/app/components/BotButton';

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
  const res = await fetch(`${process.env.STRAPI_URL}/api/carnet`, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
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
        <BotButton link="#liste-pays" ui="-tiny" />
      </section>
      <section id="liste-pays">
        <ul className="countries">
          {countries.map((country, index) => (
            <li key={country.id} className="country">
              <Link href={`/carnet-de-route/${country.slug}`}>
                <div className="country-greeting">
                  <p>{country.greeting}</p>
                </div>
                <div className="country-name">
                  <p>{country.name}</p>
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
    </main>
  );
}
