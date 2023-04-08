/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import Image from 'next/image';
import SlideLeft from '../assets/Slide-left.svg';
import SlideRight from '../assets/Slide-right.svg';

export default function Slideshow({ picture }) {
  const [index, setIndex] = useState(0);
  function prevClick() {
    return index === 0 ? setIndex(picture.length - 1) : setIndex(index - 1);
  }

  function nextClick() {
    return index >= picture.length - 1 ? setIndex(0) : setIndex(index + 1);
  }
  return (
    <section className="slidewrapper">
      {picture.length > 0 ? (
        <div>
          <div className="slidewrapper-buttons">
            <Image onClick={prevClick} src={SlideLeft} alt="Précédent" />
            <Image onClick={nextClick} src={SlideRight} alt="Suivant" />
          </div>
          <div className="slidewrapper-images">
            <img src={picture[index]} alt="Slide photo" className="" />
          </div>
          <div className="slidewrapper-count">
            {index + 1}/{picture.length}
          </div>
        </div>
      ) : null}
    </section>
  );
}
