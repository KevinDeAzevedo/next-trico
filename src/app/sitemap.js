export default async function sitemap() {
  const options = {
    headers: {
      authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
    cache: 'no-store',
  };
  const locations = await fetch(
    'http://localhost:1337/api/locations?populate=country',
    options
  );
  const locationsData = await locations.json();

  const locationsPath = locationsData.data.map((location) => ({
    url: `${process.env.SITE_URL}/carnet-de-route/${location.country.data.slug}/${location.slug}`,
    lastModified: location.publishedAt,
  }));
  const routes = [
    '',
    'carnet-de-route',
    'le-van-trico',
    'news',
    'mentions-legales',
    'contact',
  ].map((route) => ({
    url: `${process.env.SITE_URL}/${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...locationsPath];
}
