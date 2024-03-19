/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import When from './When';
import Image from 'next/image';
import Arrow from '../assets/Arrow-right.svg';

export default function PostCard({ date, title, intro, cover, link }) {
  return (
    <Link href={link}>
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
            <h3 className="postcard-content-title">
              {title}
              <span>
                <Image src={Arrow} width={15} height={15} alt=">" />
              </span>
            </h3>
            {/* <Button name="Voir plus" link={link} /> */}
          </div>
          <p className="postcard-content-intro">{intro}</p>
        </div>
      </div>
    </Link>
  );
}
