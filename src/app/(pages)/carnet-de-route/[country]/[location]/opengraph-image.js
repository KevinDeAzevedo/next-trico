/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// force disable cache
export const dynamic = 'force-dynamic';

// Get data from Strapi
const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};
async function getLocation(params) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/slugify/slugs/location/${params}?populate=*`,
    options
  );
  if (!res.ok) {
    console.log('API not responded"');
  }
  return res.json();
}

// Image metadata
export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }) {
  const data = await getLocation(params.location);
  const location = data.data;
  return new ImageResponse(
    (
      // ImageResponse JSX element
      // Main wrapper
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        {/* Background photo */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            backgroundColor: 'red',
            left: '0',
            top: '0',
            width: '1200px',
            height: '630px',
          }}
        >
          <img
            src={
              process.env.STRAPI_URL +
              location.attributes.cover.data.attributes.formats.medium.url
            }
            alt="background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(10px)',
            }}
          />
          {/* Linear Gradient */}
          <div
            style={{
              position: 'absolute',
              backgroundImage:
                'linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.40) 99%)',
              top: '0',
              right: '0',
              width: '100%',
              height: '100%',
            }}
          ></div>
        </div>
        {/* Logo on the corner */}
        <img
          src={process.env.SITE_URL + `/og/Logo-trico-2023.png`}
          alt="logo trico"
          style={{
            position: 'absolute',
            right: '3rem',
            top: '3rem',
            width: '100px',
            height: '70px',
          }}
        />
        {/* Circles centered */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '350px',
            height: '350px',
            borderRadius: '350px',
            overflow: 'hidden',
          }}
        >
          <img
            src={
              process.env.STRAPI_URL +
              location.attributes.cover.data.attributes.formats.medium.url
            }
            alt="logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <img
            src={process.env.SITE_URL + `/og/trico-nous.png`}
            alt="nous"
            style={{
              position: 'absolute',
              left: '27%',
              top: '27%',
              width: '160px',
              height: '160px',
            }}
          />
        </div>
        {/* Title of the article */}
        <div
          style={{
            color: 'white',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '3.5rem', lineHeight: '4rem' }}>
            {location.attributes.title}
          </h1>
        </div>
      </div>
    )
  );
}
