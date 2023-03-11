import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/carnet-de-route">Carnet de route</Link>
          </li>
          <li>
            <Link href="/le-van-trico">Le van Trico</Link>
          </li>
          <li>
            <Link href="/contact">Nous écrire</Link>
          </li>
        </ul>
      </nav>
      <Link href="/mentions-legales">Mentions légales</Link>
    </>
  );
}
