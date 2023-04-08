import Return from '../../../components/Return';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>
        <span>404</span>Le pays demandé est introuvable 😢
      </h1>
      <Return title={`Carnet de route`} link="/carnet-de-route" />
    </main>
  );
}
