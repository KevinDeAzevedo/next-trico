import Link from 'next/link';

async function getData() {
  const res = await fetch('http://localhost:1337/api/countries');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Carnet() {
  const data = await getData();
  const countries = data.data;
  return (
    <main>
      <h1>Carnet de route</h1>
      <ul>
        {countries.map((country, index) => (
          <li key={country.id}>
            <Link href={`/carnet-de-route/${country.slug}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
