import Image from 'next/image';
import arrowBot from '../assets/Arrow-bot.svg';

export default function BotButton({ link, ui }) {
  return (
    <>
      <a href={link}>
        <div className={`goToBot${ui}`}>
          <Image src={arrowBot} alt="Bot button" />
        </div>
      </a>
    </>
  );
}
