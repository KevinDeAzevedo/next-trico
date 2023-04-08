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
    url: `https://acme.com/${location.country.data.slug}/${location.slug}`,
    lastModified: location.publishedAt,
  }));
  const routes = ['', '/about', '/blog'].map((route) => ({
    url: `https://acme.com${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...locationsPath];
}
