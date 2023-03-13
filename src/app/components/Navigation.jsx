import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/Logo-trico.svg';
import instagram from '../assets/Instagram.svg';
import tiktok from '../assets/Tiktok.svg';
import arrowDropdown from '../assets/Arrow-dropdown.svg';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getData() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/countries`, options);
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
    <div className="navigation">
      <Link href="/">
        <Image className="logo" src={logo} alt="Logo Trico on the road" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/" className="link-page">
              Accueil
            </Link>
          </li>
          <li className="link-dropdown">
            Carnet de route <Image src={arrowDropdown} width={13} alt="" />
            <ul>
              <Link href="/carnet-de-route">
                <li>Tout</li>
              </Link>
              {countries.map((country, index) => (
                <Link
                  key={country.id}
                  href={`/carnet-de-route/${country.slug}`}
                >
                  <li>{country.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/le-van-trico" className="link-page">
              Le van Trico
            </Link>
          </li>
          <li>
            <Link href="/contact" className="link-page">
              Nous écrire
            </Link>
          </li>
          <li className="social">
            <a
              href="https://www.instagram.com/trico_ontheroad/"
              target="_blank"
            >
              <Image className="social-icon" src={instagram} alt="Instagram" />
            </a>
          </li>
          <li className="social">
            <a href="https://www.tiktok.com/@trico_ontheroad" target="_blank">
              <Image className="social-icon" src={tiktok} alt="Tiktok" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
