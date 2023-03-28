import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroBanner from '@/app/components/HeroBanner';
import PostCard from '@/app/components/PostCard';
import Return from '@/app/components/Return';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getCountry(params) {
  const { country } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/country/${country}?populate=deep,3`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

function nights(param) {
  let totalNight = 0;
  for (let item of param) {
    totalNight += item.attributes.nights;
  }
  return totalNight.toLocaleString('fr');
}

function distance(param) {
  let totalDistance = 0;
  for (let item of param) {
    totalDistance += item.attributes.distance;
  }
  return totalDistance.toLocaleString('fr');
}

function water(param) {
  let totalWater = 0;
  for (let item of param) {
    totalWater += item.attributes.water;
  }
  return totalWater.toLocaleString('fr');
}

function gas(param) {
  let totalGas = 0;
  for (let item of param) {
    totalGas += item.attributes.gas;
  }
  return totalGas.toLocaleString('fr');
}

export default async function Country({ params }) {
  const data = await getCountry(params);
  const country = data.data.attributes;
  const locations = country.locations.data;

  return (
    <main>
      <HeroBanner
        title={country.name}
        cover={country.cover.data.attributes.url}
        countryslug={country.slug}
        botbutton={true}
      />
      <div className="intro">
        <div className="intro-content">
          <h2>{country.subtitle}</h2>
          <p>{country.introduction}</p>
        </div>
        <div className="intro-data">
          <ul>
            <li>
              <p>{nights(locations)} nuits </p>passées
            </li>
            <li>
              <p>{distance(locations)} kms</p> parcourus
            </li>
            <li>
              <p>{water(locations)} L</p> d'eau consommée
            </li>
            <li>
              <p>{gas(locations)} L</p> d'essence bien utilisée
            </li>
          </ul>
          <div className="intro-data-separator"></div>
        </div>
      </div>
      <ul className="list">
        {locations.map((item, index) => (
          <li key={item.id} className="list-post">
            <PostCard
              date={item.attributes.date}
              title={item.attributes.title}
              link={`/carnet-de-route/${country.slug}/${item.attributes.slug}`}
              intro={item.attributes.intro}
              cover={item.attributes.cover.data.attributes.url}
            />
          </li>
        ))}
      </ul>
      <Return title="Autres routes" link="/carnet-de-route" />
    </main>
  );
}
