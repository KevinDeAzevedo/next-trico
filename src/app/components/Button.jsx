import Link from 'next/link';
import Image from 'next/image';
import Arrow from '@/app/assets/Arrow-right.svg';

export default function Button({ name, link }) {
  return (
    <>
      <Link href={link} className="simple-button">
        <div className="simple-button-content">
          {name}
          <Image className="simple-button-arrow" src={Arrow} alt=">" />
        </div>
      </Link>
    </>
  );
}
