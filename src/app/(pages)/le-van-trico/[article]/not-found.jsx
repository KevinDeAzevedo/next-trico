import Return from '../../../components/Return';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>
        <span>404</span>L&apos;article demandé est introuvable 😢
      </h1>
      <Return title={`Retour à l'accueil`} link="/" />
    </main>
  );
}
