import React from 'react';
import Logo from './Logo';
import { IElementsLink, INavMenuItem } from '@/app/types';
import NavbarMenu from '@/app/components/Navbar/NavbarMenu';

export interface NavbarProps {
  logoURL: string | null;
  darkLogoURL: string | null;
  menuItems: INavMenuItem[];
}

export default function Index({
  menuItems,
  logoURL,
  darkLogoURL,
}: NavbarProps) {
  return (
    <div className="border-b-2 border-black dark:border-slate-800 dark:bg-black dark:text-gray-100">
      <div className="container mx-auto flex w-full items-center p-2">
        <div className="flex-grow lg:flex-grow-0">
          <Logo lightModeURL={logoURL} darkModeURL={darkLogoURL} />
        </div>

        <NavbarMenu menuItems={menuItems} />
      </div>
    </div>
  );
}
