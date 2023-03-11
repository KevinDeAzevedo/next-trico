import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getLocation(params) {
  const { location } = params;
  const res = await fetch(
    `http://localhost:1337/api/slugify/slugs/location/${location}?populate=*`
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
      <Link href={`/carnet-de-route/${country.slug}`}>
        Retour : {country.name}
      </Link>
    </main>
  );
}
