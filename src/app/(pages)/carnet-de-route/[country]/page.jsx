import Link from 'next/link';

async function getData(params) {
  const { country } = params;
  const res = await fetch(
    `http://localhost:1337/api/slugify/slugs/country/${country}?populate=locations`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Country({ params }) {
  const data = await getData(params);
  const country = data.data.attributes;
  const locations = country.locations.data;
  return (
    <main>
      <h1>{country.name}</h1>
      <ul>
        {locations.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Link
              href={`/carnet-de-route/${country.name}/${item.attributes.slug}`}
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
