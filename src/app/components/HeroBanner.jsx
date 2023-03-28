/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import BotButton from '@/app/components/BotButton';

export default function HeroBanner({ title, cover, countryslug, botbutton }) {
  return (
    <div className="hero-banner">
      <div className="hero-banner-ariane">
        <Link href="/carnet-de-route">Carnet de route</Link>
        <span> / </span>
        <Link href={`/carnet-de-route/${countryslug}`}>{title}</Link>
      </div>
      <div className="hero-banner-title">
        <h1>{title}</h1>
        {botbutton ? <BotButton link="#" ui="-tiny" /> : null}
      </div>
      <div className="hero-banner-image">
        <img src={`${process.env.STRAPI_URL}${cover}`} alt="" />
      </div>
    </div>
  );
}
