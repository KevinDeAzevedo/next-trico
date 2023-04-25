import Marquee from './components/Marquee';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Gtag from './components/Gtag';
import Cookies from './components/Cookies';
import './style/main.sass';

export const metadata = {
  title: '',
  description: '',
  metadataBase: new URL(process.env.SITE_URL),
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    images: [
      {
        url: `${process.env.SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Marquee />
        <Navigation />
        {children}
        <Footer />
        <Gtag />
        <Cookies />
      </body>
    </html>
  );
}
