import Link from 'next/link';

async function getData() {
  const res = await fetch('http://localhost:1337/api/countries');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Navigation() {
  const data = await getData();
  const countries = data.data;

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li className="dropdown">
            Carnet de route
            <ul>
              <li>
                <Link href="/carnet-de-route">Tout</Link>
              </li>
              {countries.map((country, index) => (
                <li key={country.id}>
                  <Link href={`/carnet-de-route/${country.slug}`}>
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/le-van-trico">Le van Trico</Link>
          </li>
          <li>
            <Link href="/contact">Nous écrire</Link>
          </li>
          <li>
            <a
              href="https://www.instagram.com/trico_ontheroad/"
              target="_blank"
            >
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@trico_ontheroad" target="_blank">
              Tiktok
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
