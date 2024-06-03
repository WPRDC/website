import { IElementsLink, IElementsLogo } from '@/app/types';
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
    <div className="border-textSecondary border-t-2 bg-white px-6 pb-16 pt-10 dark:bg-black">
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

        <div className="space-x-2">
          {affiliateLogos.map((logo) => {
            const darkURL = getStrapiMedia(
              logo?.image?.data?.attributes.url ?? '',
            );
            const lightURL = getStrapiMedia(
              logo?.darkImage?.data?.attributes.url ?? '',
            );
            return (
              <Logo
                key={logo.id}
                darkModeURL={darkURL}
                lightModeURL={lightURL}
                height={100}
                width={200}
              />
            );
          })}
          <a href="https://aws.amazon.com/what-is-cloud-computing">
            <img
              className="hidden w-40 dark:block"
              src="https://d0.awsstatic.com/logos/powered-by-aws-white.png"
              alt="Powered by AWS Cloud Computing"
            />
            <img
              className="block w-40 dark:hidden"
              src="https://d0.awsstatic.com/logos/powered-by-aws.png"
              alt="Powered by AWS Cloud Computing"
            />
          </a>
          <div className="max-w-sm pt-1.5 text-xs">
            Support for Health Equity datasets and tools provided by{' '}
            <A external href="https://aws.amazon.com/">
              Amazon Web Services (AWS)
            </A>{' '}
            through their{' '}
            <A
              href="https://aws.amazon.com/government-education/nonprofits/global-social-impact/health-equity/"
              external
            >
              Health Equity Initiative
            </A>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
