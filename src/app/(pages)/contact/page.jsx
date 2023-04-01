import Form from '@/app/components/Form';

const options = {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
  cache: 'no-store',
};

async function getContact() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/contact?populate=*`,
    options
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Contact() {
  const data = await getContact();
  const contact = data.data;
  const avatar = contact.avatar.data;
  return (
    <main>
      <div className="hero-contact">
        <div className="hero-contact-image">
          <img src={`${process.env.STRAPI_URL}${avatar.url}`} alt="Avatar" />
        </div>
        <div className="hero-contact-bubblespeech">
          <p>👋</p>
        </div>
        <h1>{contact.title}</h1>
      </div>
      <Form
        StrapiUrl={process.env.STRAPI_URL}
        StrapiToken={process.env.STRAPI_TOKEN}
      />
    </main>
  );
}
