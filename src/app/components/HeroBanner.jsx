/* eslint-disable @next/next/no-img-element */
export default function HeroBanner({ title, cover }) {
  return (
    <div className="hero-banner">
      <div className="hero-banner-title">
        <h1>{title}</h1>
      </div>
      <div className="hero-banner-image">
        <img src={`${process.env.STRAPI_URL}${cover}`} alt="" />
      </div>
    </div>
  );
}
