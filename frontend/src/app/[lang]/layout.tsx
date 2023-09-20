import type { Metadata } from 'next';
import '../globals.css';
import { getStrapiMedia, getStrapiURL } from '@/app/lib/api-helpers';

import { i18n } from '@/app/lib/i18n-config';
import Footer from '@/app/components/Footer/footer';
import Navbar from '@/app/components/Navbar';
import { FALLBACK_SEO } from '@/app/lib/constants';
import { getGlobal, getMainMenu } from '@/app/lib/data-fetchers';
import { jetbrainsMono, publicSans } from '@/app/[lang]/fonts';

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
      <body
        className={`${jetbrainsMono.variable} ${publicSans.variable} flex min-h-screen flex-col`}
      >
        <Navbar
          logoURL={navbarLogoURL}
          darkLogoURL={navbarDarkLogoURL}
          menuItems={menuItems.data}
        />
        <main className="mx-auto mb-16 max-w-7xl flex-grow px-2 pt-8">
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
