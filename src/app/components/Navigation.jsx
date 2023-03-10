import Link from 'next/link';

export default function Navigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="pages/carnet-de-route">Carnet de route</Link>
          </li>
          <li>
            <Link href="pages/le-van-trico">Le van Trico</Link>
          </li>
          <li>
            <Link href="pages/contact">Nous écrire</Link>
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
