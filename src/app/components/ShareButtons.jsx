'use client';

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from 'react-share';

export default function ShareButtons({ link }) {
  return (
    <div className="share-wrapper">
      <div className="share-wrapper-content">
        <p>Partager l&apos;article sur :</p>
        <EmailShareButton url={link}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <FacebookShareButton url={link}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={link}>
          <XIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
    </div>
  );
}
