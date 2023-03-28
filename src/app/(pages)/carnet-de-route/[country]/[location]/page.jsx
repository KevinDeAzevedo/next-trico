import Link from 'next/link';
import { notFound } from 'next/navigation';
import Return from '@/app/components/Return';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getLocation(params) {
  const { location } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/location/${location}?populate=*`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Country({ params }) {
  const data = await getLocation(params);
  const location = data.data.attributes;
  const country = location.country.data.attributes;
  return (
    <main>
      <h1>{location.title}</h1>
      <Return title={country.name} link={`/carnet-de-route/${country.slug}`} />
    </main>
  );
}
