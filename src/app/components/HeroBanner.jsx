/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import BotButton from '../components/BotButton';
import LocationIcn from '../assets/Location-icon.svg';
import When from './When';

export default function HeroBanner({
  style,
  ariane,
  title,
  cover,
  date,
  gmap,
  botButtonLink,
}) {
  return (
    <div className="hero-banner">
      <div className="hero-banner-ariane">{ariane}</div>
      <div className="hero-banner-title">
        <h1>{title}</h1>
        {style === 'v1' ? (
          <BotButton link={botButtonLink} ui="-tiny" />
        ) : (
          <When date={date} />
        )}
      </div>
      {gmap === undefined || gmap === null ? null : (
        <a href={gmap} target="_blank">
          <div className="hero-banner-location">
            <Image src={LocationIcn} alt="Lieux" />
          </div>
        </a>
      )}
      <div className="hero-banner-image">
        <img src={`${process.env.STRAPI_URL}${cover}`} alt="" />
      </div>
    </div>
  );
}
