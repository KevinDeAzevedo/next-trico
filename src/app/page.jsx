async function getData() {
  const res = await fetch('http://localhost:1337/api/homepage');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default async function Home() {
  const data = await getData();
  const home = data.data;
  return (
    <main>
      <h1>{home.firstTitle}</h1>
    </main>
  );
}
