import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroBanner from '../../../components/HeroBanner';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getCountry(params) {
  const { country } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/country/${country}?populate=*`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
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
      />
      <ul>
        {locations.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Link
              href={`/carnet-de-route/${country.slug}/${item.attributes.slug}`}
            >
              {item.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/carnet-de-route">Retour : Carnet de Route</Link>
    </main>
  );
}
