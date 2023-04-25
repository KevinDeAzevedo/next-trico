export default async function sitemap() {
  const options = {
    headers: {
      authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
    cache: 'no-store',
  };
  const countries = await fetch(
    `${process.env.STRAPI_URL}/api/countries`,
    options
  );
  const locations = await fetch(
    `${process.env.STRAPI_URL}/api/locations?populate=country`,
    options
  );
  const articles = await fetch(
    `${process.env.STRAPI_URL}/api/articles`,
    options
  );

  const countriesData = await countries.json();
  const locationsData = await locations.json();
  const articlesData = await articles.json();

  const countriesPath = countriesData.data.map((country) => ({
    url: `${process.env.SITE_URL}/carnet-de-route/${country.slug}`,
    lastModified: country.publishedAt,
  }));
  const locationsPath = locationsData.data.map((location) => ({
    url: `${process.env.SITE_URL}/carnet-de-route/${location.country.data.slug}/${location.slug}`,
    lastModified: location.publishedAt,
  }));
  const articlesPath = articlesData.data.map((article) => ({
    url: `${process.env.SITE_URL}/le-van-trico/${article.slug}`,
    lastModified: article.publishedAt,
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

  return [...routes, ...countriesPath, ...locationsPath, ...articlesPath];
}
