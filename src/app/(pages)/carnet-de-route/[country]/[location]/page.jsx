import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CustomLink from '../../../../components/CustomLink';
import HeroBanner from '../../../../components/HeroBanner';
import DatasSnippet from '../../../../components/DatasSnippet';
import Return from '../../../../components/Return';
import Slideshow from '../../../../components/Slideshow';
import Comment from '../../../../components/Comment';
import ShareButtons from '../../../../components/ShareButtons';

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

// SEO ZONE
export async function generateMetadata({ params }) {
  const data = await getLocation(params);
  const seoData = data.data.attributes.seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: true,
    },
  };
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
        `${process.env.STRAPI_URL}${picture.attributes.formats.medium.url}`
      );
    }
  }
  // custom component for MDX to render links on new tab
  const components = {
    a: CustomLink,
  };
  return (
    <main>
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
        cover={location.cover.data.attributes.formats.large.url}
        date={location.date}
        gmap={location.gmaps}
      />
      <DatasSnippet
        days={location.days}
        budget={location.budget}
        hours={location.hours}
        minutes={location.minutes}
        motion={location.motion}
        difficulty={location.difficulty}
        accessibility={location.accessibility}
        distance={location.distance}
      />
      <section className="article-content">
        {/* <ul className="article-content-data">
          <li>
            {location.distance === null ? (
              <p>Distance : 0</p>
            ) : (
              <p>
                Distance :{' '}
                <span className="styled">
                  {location.distance.toLocaleString('fr')} km(s)
                </span>
                <span className="styled"> {location.motion}</span>
              </p>
            )}
          </li>
          <li>
            {location.budget === null ? (
              <p>Budget : 0</p>
            ) : (
              <p>
                Budget :{' '}
                <span className="styled">
                  {location.budget.toLocaleString('fr')} €
                </span>
              </p>
            )}
          </li>
          {location.days === null && location.hours === null ? null : (
            <li>
              <p>
                Temps passé :
                {location.days === null ? null : (
                  <span className="styled"> {location.days} jours</span>
                )}
                <span>
                  {location.hours === null ? null : (
                    <span className="styled"> {location.hours} heure(s)</span>
                  )}
                </span>
              </p>
            </li>
          )}
        </ul> */}
        <ShareButtons
          link={`${process.env.SITE_URL}/carnet-de-route/${country.slug}/${location.slug}`}
        />
        <MDXRemote
          source={processImage(location.content)}
          components={components}
        />
        <Slideshow picture={arrayOfPictures} />
        <ShareButtons
          link={`${process.env.SITE_URL}/carnet-de-route/${country.slug}/${location.slug}`}
        />
        <Comment
          url={`${process.env.SITE_URL}/carnet-de-route/${country.slug}/${location.slug}`}
          id={location.slug}
          title={location.title}
        />
      </section>
      <Return title={country.name} link={`/carnet-de-route/${country.slug}`} />
    </main>
  );
}
