/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import When from './When';
import Button from './Button';

export default function PostCard({ date, title, intro, cover, link }) {
  return (
    <div className="postcard">
      <div className="postcard-image">
        <img
          src={`${process.env.STRAPI_URL}${cover}`}
          alt="Couverture d'article"
        />
      </div>
      <div className="postcard-content">
        <div>
          <When date={date} />
          <h3 className="postcard-content-title">{title}</h3>
          <Button name="Voir plus" link={link} />
        </div>
        <p className="postcard-content-intro">{intro}</p>
      </div>
    </div>
  );
}
