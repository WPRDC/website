'use client';

import NavLink from '@/app/components/Navbar/NavLink';
import React, { useState } from 'react';
import { IElementsLink } from '@/app/types';
import classNames from 'classnames';

export interface NavbarMenuProps {
  links: Array<IElementsLink>;
}

export default function NavbarMenu({ links }: NavbarMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="ml-4 md:ml-24">
      <button
        className={classNames('p-4 md:hidden')}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-text h-6 w-6 dark:text-gray-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <ul
        onClick={() => setIsOpen(false)}
        className={classNames('items-center gap-4 md:flex', {
          hidden: !isOpen,
          'grid-cols-auto border-text bg-background absolute inset-x-0 top-20 space-y-4 border-b-2 px-12 py-6 shadow-sm lg:space-y-0':
            isOpen,
        })}
      >
        {links.map((link) => (
          <NavLink key={link.id} {...link} />
        ))}
      </ul>
    </div>
  );
}
