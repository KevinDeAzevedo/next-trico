import Script from 'next/script';

export default function Gtag() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2YG1RMTTF4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-2YG1RMTTF4');
        `}
      </Script>
    </>
  );
}
