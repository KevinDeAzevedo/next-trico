import Image from 'next/image';
import gribouille from '../assets/Gribouille.webp';

export default function Status({ status }) {
  return (
    <div className="status">
      {/* <Image src={gribouille} /> */}
      {status ? <p>Finalisé</p> : <p>En cours</p>}
    </div>
  );
}
