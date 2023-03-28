import Link from 'next/link';
import Image from 'next/image';
import Path from '@/app/assets/Path-white.svg';

export default function Return({ title, link }) {
  return (
    <div className="return">
      <p>{title}</p>
      <Link href={link}>Retour</Link>
      <Image src={Path} alt="" />
    </div>
  );
}
