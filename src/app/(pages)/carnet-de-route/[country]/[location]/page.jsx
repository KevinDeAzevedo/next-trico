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
      <ul>
        <li>
          {location.distance === null ? (
            <p>Distance : 0</p>
          ) : (
            <p>
              Distance : {location.distance.toLocaleString('fr')} km(s)
              <span> {location.motion}</span>
            </p>
          )}
        </li>
        <li>
          {location.budget === null ? (
            <p>Budget : 0</p>
          ) : (
            <p>Budget : {location.budget.toLocaleString('fr')} €</p>
          )}
        </li>
        <li>
          {location.days === null && location.hours === null ? null : (
            <p>
              Temps passé :
              {location.days === null ? null : (
                <span> {location.days} jours</span>
              )}
              <span>
                {location.hours === null ? null : (
                  <span> {location.hours} heure(s)</span>
                )}
              </span>
            </p>
          )}
        </li>
      </ul>
      <HeroBanner
        style="v2"
        ariane={
          <div>
            <Link href="/carnet-de-route">Carnet de route</Link>
            <span> / </span>
            <Link href={`/carnet-de-route/${country.slug}`}>
              {country.name}
            </Link>
            <span> / </span>
            <Link href={`/carnet-de-route/${country.slug}/${location.slug}`}>
              {location.title}
            </Link>
          </div>
        }
        title={location.title}
        cover={location.cover.data.attributes.url}
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
