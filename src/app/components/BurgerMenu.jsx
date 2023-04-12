'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import instagram from '../assets/Instagram.svg';
import tiktok from '../assets/Tiktok.svg';
import arrowDropdown from '../assets/Arrow-dropdown.svg';

export default function BurgerMenu({ countries }) {
  let [isOpen, setIsOpen] = useState(false);
  const menuClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="burger-button" onClick={menuClick}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <nav className={isOpen ? 'burger-menu open' : 'burger-menu'}>
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
              {countries.map((country) => (
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
    </>
  );
}
