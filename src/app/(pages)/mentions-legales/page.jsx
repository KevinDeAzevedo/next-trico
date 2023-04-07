import { MDXRemote } from 'next-mdx-remote/rsc';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getLegal() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/legal?populate=*`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
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
export async function generateMetadata() {
  const data = await getLegal();
  const seoData = data.data.seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: {
      index: true,
    },
  };
}

export default async function Legal() {
  const data = await getLegal();
  const legal = data.data;
  return (
    <main className="legal">
      <h1>{legal.title}</h1>
      <MDXRemote source={processImage(legal.content)} />
    </main>
  );
}
