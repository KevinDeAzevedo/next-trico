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
  // know total of news
  const news = await fetch(`${process.env.STRAPI_URL}/api/news`, options);
  const newsData = await news.json();
  // fetch with total of news
  const breakingNews = await fetch(
    `${process.env.STRAPI_URL}/api/news?fields[0]=id&&fields[1]=publishedAt&&pagination[page]=1&pagination[pageSize]=${newsData.meta.pagination.total}`,
    options
  );

  const countriesData = await countries.json();
  const locationsData = await locations.json();
  const articlesData = await articles.json();
  const breakingNewsData = await breakingNews.json();
  const arrayOfPageNews = Array(newsData.meta.pagination.pageCount).fill('');

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
    'mentions-legales',
    'contact',
  ].map((route) => ({
    url: `${process.env.SITE_URL}/${route}`,
    lastModified: new Date().toISOString(),
  }));
  const breakingNewsPath = breakingNewsData.data.map((news) => ({
    url: `${process.env.SITE_URL}/news/${news.id}`,
    lastModified: news.publishedAt,
  }));
  const pagesNewsPath = arrayOfPageNews.map((page, index) => ({
    url: `${process.env.SITE_URL}/news?page=${index + 1}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...routes,
    ...countriesPath,
    ...locationsPath,
    ...articlesPath,
    ...pagesNewsPath,
    ...breakingNewsPath,
  ];
}
