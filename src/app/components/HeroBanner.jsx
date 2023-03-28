/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import BotButton from '@/app/components/BotButton';
import When from './When';

export default function HeroBanner({
  title,
  cover,
  countryname,
  countryslug,
  locationslug,
  botbutton,
  date,
  gmap,
}) {
  return (
    <div className="hero-banner">
      <div className="hero-banner-ariane">
        <Link href="/carnet-de-route">Carnet de route</Link>
        <span> / </span>
        {botbutton ? (
          <Link href={`/carnet-de-route/${countryslug}`}>{countryname}</Link>
        ) : (
          <span>
            <Link href={`/carnet-de-route/${countryslug}`}>{countryname}</Link>
            <span> / </span>
            <Link href={`/carnet-de-route/${countryslug}/${locationslug}`}>
              {title}
            </Link>
          </span>
        )}
      </div>
      <div className="hero-banner-title">
        {botbutton === false ? <h1>{title}</h1> : <h1>{countryname}</h1>}
        {botbutton ? <BotButton link="#" ui="-tiny" /> : <When date={date} />}
        {gmap}
      </div>
      <div className="hero-banner-image">
        <img src={`${process.env.STRAPI_URL}${cover}`} alt="" />
      </div>
    </div>
  );
}
