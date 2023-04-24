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
