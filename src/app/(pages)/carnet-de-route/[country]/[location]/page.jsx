import Link from 'next/link';

async function getData(params) {
  const { location } = params;
  const res = await fetch(
    `http://localhost:1337/api/slugify/slugs/location/${location}?populate=*`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Country({ params }) {
  const data = await getData(params);
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
