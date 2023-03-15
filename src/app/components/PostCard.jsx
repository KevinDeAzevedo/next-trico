/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import When from './When';

export default function PostCard({ date, title, intro, cover, slug }) {
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
          <Link href={`/le-van-trico/${slug}`}>Voir plus</Link>
        </div>
        <p className="postcard-content-intro">{intro}</p>
      </div>
    </div>
  );
}
