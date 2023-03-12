import Link from 'next/link';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getCountries() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/countries`, options);
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
      <h1>{page.title}</h1>
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
