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

function days(param) {
  let totalDays = 0;
  for (let item of param) {
    totalDays += item.attributes.days;
  }
  return totalDays.toLocaleString('fr');
}

function distance(param) {
  let totalDistance = 0;
  for (let item of param) {
    totalDistance += item.attributes.distance;
  }
  return totalDistance.toLocaleString('fr');
}

function naturespot(param) {
  let totalNatureSpot = 0;
  for (let item of param) {
    totalNatureSpot += item.attributes.naturespot;
  }
  return totalNatureSpot.toLocaleString('fr');
}

function culturespot(param) {
  let totalCultureSpot = 0;
  for (let item of param) {
    totalCultureSpot += item.attributes.culturespot;
  }
  return totalCultureSpot.toLocaleString('fr');
}

// SEO ZONE
export async function generateMetadata({ params }) {
  const data = await getCountry(params);
  const seoData = data.data.attributes.seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: true,
    },
  };
}

export default async function Country({ params }) {
  const data = await getCountry(params);
  const country = data.data.attributes;
  const locations = country.locations.data;
  return (
    <main>
      <HeroBanner
        style="v1"
        ariane={
          <div>
            <Link href="/carnet-de-route">Carnet de route</Link>
            <span> / </span>
            <Link href={`/carnet-de-route/${country.slug}`}>
              {country.name}
            </Link>
          </div>
        }
        title={country.name}
        cover={country.cover.data.attributes.url}
        botButtonLink="#list"
      />
      <div className="intro">
        <div className="intro-content">
          <h2>{country.subtitle}</h2>
          <p>{country.introduction}</p>
        </div>
        <div className="intro-data">
          <ul>
            <li>
              <p>{days(locations)} jours </p>passés
            </li>
            <li>
              <p>{distance(locations)} kms</p> parcourus
            </li>
            <li>
              <p>{naturespot(locations)}</p> spots naturels
            </li>
            <li>
              <p>{culturespot(locations)}</p> spots culturels
            </li>
          </ul>
          <div className="intro-data-separator"></div>
        </div>
      </div>
      <section id="list">
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
      </section>
      <Return title="Autres routes" link="/carnet-de-route" />
    </main>
  );
}
