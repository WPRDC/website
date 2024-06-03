import type { Metadata } from 'next';
import '../globals.css';
import { getStrapiMedia, getStrapiURL } from '@/app/lib/api-helpers';

import { i18n } from '@/app/lib/i18n-config';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { FALLBACK_SEO } from '@/app/lib/constants';
import { getGlobal, getMainMenu } from '@/app/lib/data-fetchers';
import { jetbrainsMono, publicSans } from '@/app/[lang]/fonts';
import Script from 'next/script';

/** Special Next.js function for assigning metadata to pages under this layout */
export async function generateMetadata(): Promise<Metadata> {
  const globalResponse = await getGlobal();
  if (!globalResponse.data) return FALLBACK_SEO;

  const { metadata, favicon } = globalResponse.data.attributes;
  const { title, description } = metadata ?? {};
  const url = favicon?.data?.attributes.url ?? '';

  return {
    title: title,
    description: description,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const global = await getGlobal();
  const menuItems = await getMainMenu();

  if (!global.data) return null;

  const {
    navbarLogo,
    footerLogo,
    navbarLinks = [],
    affiliateLogos,
  } = global.data.attributes;

  const navbarLogoURL = getStrapiMedia(
    navbarLogo?.image?.data?.attributes.url ?? '',
  );
  const navbarDarkLogoURL = getStrapiMedia(
    navbarLogo?.darkImage?.data?.attributes.url ?? '',
  );

  const footerLogoURL = getStrapiMedia(
    footerLogo?.image?.data?.attributes.url ?? '',
  );
  const footerDarkLogoURL = getStrapiMedia(
    footerLogo?.darkImage?.data?.attributes.url ?? '',
  );

  return (
    <html lang={params.lang}>
      <Script>
        {`
          var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://analytics.wprdc.org/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '2']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
      `}
      </Script>
      <body
        className={`${jetbrainsMono.variable} ${publicSans.variable} flex min-h-screen flex-col`}
      >
        <Navbar
          logoURL={navbarLogoURL}
          darkLogoURL={navbarDarkLogoURL}
          menuItems={menuItems.data}
        />
        <main className="bg-background dark:bg-backgroundDark mb-16 flex-grow pt-8">
          {children}
        </main>
        <Footer
          logoURL={footerLogoURL}
          darkLogoURL={footerDarkLogoURL}
          links={navbarLinks}
          affiliateLogos={affiliateLogos}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
