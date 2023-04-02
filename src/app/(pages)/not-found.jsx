import Return from '@/app/components/Return';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>
        <span>404</span>La page demandée est introuvable 😢
      </h1>
      <Return title={`Retour à l'accueil`} link="/" />
    </main>
  );
}
