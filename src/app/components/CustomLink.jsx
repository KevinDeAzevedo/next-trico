const CustomLink = ({ href, children, ...props }) => {
  // Si le lien commence par "http" ou "https", ajouter target="_blank"
  const isExternal =
    href && (href.startsWith('http') || href.startsWith('https'));

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  // Sinon, rendre le lien normalement
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default CustomLink;
