'use client';

function handleClick(e) {
  e.preventDefault();
  window.location.href = '/';
}

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>
        <span>404</span>La page demandée est introuvable 😢
      </h1>
      <a href="/" onClick={handleClick}>
        Retour à l&apos;Accueil
      </a>
    </main>
  );
}
