import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getCountry(params) {
  const { country } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/country/${country}?populate=locations`,
    { cache: 'no-store' }
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
      <h1>{country.name}</h1>
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
