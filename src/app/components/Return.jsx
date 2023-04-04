import Link from 'next/link';
import Image from 'next/image';
import Path from '@/app/assets/Path-white.svg';
import Button from './Button';

export default function Return({ title, link }) {
  return (
    <div className="return">
      <p>{title}</p>
      <Button name="Retour" link={link} />
      <Image className="return-path" src={Path} alt="" />
    </div>
  );
}
