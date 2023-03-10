export default function Country({ params }) {
  const { slug } = params;
  return (
    <main>
      <h1>{slug} Page</h1>
    </main>
  );
}
