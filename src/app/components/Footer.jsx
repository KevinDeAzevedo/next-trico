import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/Logo-trico.svg';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-main">
        <Image className="logo" src={logo} alt="Logo Trico on the road" />
        <div className="footer-main-navigation">
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
        </div>
      </div>
      <div className="footer-bot">
        <Link href="/mentions-legales">Mentions légales</Link>
      </div>
    </div>
  );
}
