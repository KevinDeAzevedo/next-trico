import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/Logo-trico.svg';
import BurgerMenu from './BurgerMenu';

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
        <Image
          className="logo"
          width={70}
          height={70}
          src={logo}
          alt="Logo Trico on the road"
        />
      </Link>
      <BurgerMenu countries={countries} />
    </div>
  );
}
