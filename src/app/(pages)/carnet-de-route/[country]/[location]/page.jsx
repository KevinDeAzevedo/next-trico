import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import HeroBanner from '@/app/components/HeroBanner';
import Return from '@/app/components/Return';
import Slideshow from '@/app/components/Slideshow';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getLocation(params) {
  const { location } = params;
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/location/${location}?populate=*`,
    options
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

function processImage(contentParam) {
  // Ajoute l'URL du backend
  return contentParam.replaceAll(
    '/uploads',
    `${process.env.STRAPI_URL}/uploads`
  );
}

export default async function Country({ params }) {
  const data = await getLocation(params);
  const location = data.data.attributes;
  const country = location.country.data.attributes;
  const picturesSlideshow = location.slideshow.data;
  const arrayOfPictures = [];
  if (picturesSlideshow != null) {
    for (let picture of picturesSlideshow) {
      arrayOfPictures.push(
        `${process.env.STRAPI_URL}${picture.attributes.url}`
      );
    }
  }
  return (
    <main>
      <HeroBanner
        title={location.title}
        countryname={country.name}
        cover={location.cover.data.attributes.url}
        countryslug={country.slug}
        locationslug={location.slug}
        botbutton={false}
        date={location.date}
        gmap={location.gmaps}
      />
      <section className="article-content">
        <MDXRemote source={processImage(location.content)} />
        <Slideshow picture={arrayOfPictures} />
      </section>
      <Return title={country.name} link={`/carnet-de-route/${country.slug}`} />
    </main>
  );
}
