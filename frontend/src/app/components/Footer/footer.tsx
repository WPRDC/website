import { IElementsLink, IElementsLogo } from '@/app/types';
import Image from 'next/image';
import A from '@/app/components/A';
import Logo from '@/app/components/Navbar/Logo';
import React from 'react';
import { getStrapiMedia } from '@/app/lib/api-helpers';

export interface FooterProps {
  links: Array<IElementsLink>;
  logoURL: string | null;
  darkLogoURL: string | null;
  affiliateLogos?: IElementsLogo[];
}

export default function Footer({
  links,
  logoURL,
  darkLogoURL,
  affiliateLogos = [],
}: FooterProps) {
  return (
    <div className="border-textSecondary border-t-2 bg-black px-6 pb-16 pt-10">
      <div className="container mx-auto max-w-screen-xl space-y-4 lg:flex ">
        <div>
          <Logo lightModeURL={logoURL} darkModeURL={darkLogoURL} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            {links.map((link) => (
              <div>
                <A key={link.id} href={link.url ?? '#'} className="font-normal">
                  {link.label}
                </A>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow"></div>
        <div>
          {affiliateLogos.map((logo) => {
            const darkURL = getStrapiMedia(
              logo?.image?.data?.attributes.url ?? '',
            );
            const lightURL = getStrapiMedia(
              logo?.darkImage?.data?.attributes.url ?? '',
            );
            return (
              <Logo darkModeURL={darkURL} lightModeURL={lightURL} width={200} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
