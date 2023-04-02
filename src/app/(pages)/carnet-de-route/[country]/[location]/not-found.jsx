import Return from '@/app/components/Return';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>
        <span>404</span>L'article demandé est introuvable 😢
      </h1>
      <Return title={`Retour à l'accueil`} link="/" />
    </main>
  );
}
