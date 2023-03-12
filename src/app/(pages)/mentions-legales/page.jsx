async function getLegal() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/legal`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Legal() {
  const data = await getLegal();
  const legal = data.data;
  return (
    <main>
      <h1>{legal.title}</h1>
      <p>{legal.content}</p>
    </main>
  );
}
