'use client';

import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { IElementsLink, INavbarSubMenuItem, INavMenuItem } from '@/app/types';
import NavbarMenu from '@/app/components/Navbar/NavbarMenu';
import Link from 'next/link';
import classNames from 'classnames';
import { ParsedHTML } from '@/app/components/ParsedHTML';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<INavMenuItem | null>();
  const [currentDescription, setCurrentDescription] = useState<string | null>();

  function closeMenu() {
    setCurrentMenuItem(null);
  }

  const handleMenuClick = (menuItem: INavMenuItem) => () => {
    if (!!currentMenuItem && menuItem.id === currentMenuItem.id) {
      console.log('CLOSING');
      closeMenu();
    } else {
      setCurrentMenuItem(menuItem);
    }
  };

  const handleHover = (submenuItem: INavbarSubMenuItem) => () => {
    setCurrentDescription(submenuItem.description);
  };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        closeMenu();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <div className="fixed top-0 w-full dark:text-gray-100">
      {/* Navbar */}
      <div className="z-50 w-full border-b-2 border-black bg-white py-3 dark:border-slate-800 dark:bg-black">
        <div className="container mx-auto flex w-full max-w-7xl items-center space-x-24">
          <div className="flex-grow lg:flex-grow-0">
            <Logo lightModeURL={logoURL} darkModeURL={darkLogoURL} />
          </div>
          <nav className="hidden md:block">
            <ul>
              {menuItems.map((menuItem) => (
                <li className="inline-block px-4">
                  <button onClick={handleMenuClick(menuItem)}>
                    {menuItem.attributes.primaryLink?.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
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
        </div>
      </div>

      {/* Menu Drawer */}
      {!!currentMenuItem && (
        <div className="z-50 w-full border-b-4 border-black bg-white dark:border-slate-800 dark:bg-black">
          <div className="container static mx-auto flex min-h-full w-full max-w-4xl py-4">
            <div className="w-2/5">
              {!!currentMenuItem.attributes.subMenu && (
                <ul className="mr-8">
                  {currentMenuItem.attributes.subMenu.map((menuItem) => (
                    <li key={menuItem.id} onMouseEnter={handleHover(menuItem)}>
                      <Link
                        onClick={closeMenu}
                        href={menuItem.link?.url ?? '#'}
                        className="hover:ring-primary dark:hover:bg-backgroundDark decoration-primary my-1 block p-2 hover:bg-amber-100 hover:font-bold hover:ring-2"
                      >
                        <div className="text-lg">{menuItem.link?.label}</div>
                        {!!menuItem.deatailLine && (
                          <div className="text-textSecondary dark:text-textSecondaryDark text-sm">
                            {menuItem.deatailLine}
                          </div>
                        )}
                      </Link>
                      {!!menuItem.subItems && !!menuItem.subItems.length && (
                        <ul className="ml-4">
                          {menuItem.subItems.map((subItem) => (
                            <li>
                              <Link
                                onClick={closeMenu}
                                href={subItem.url ?? '#'}
                                className="hover:ring-primary dark:hover:bg-backgroundDark decoration-primary my-1 block p-2 hover:bg-amber-100 hover:font-bold hover:ring-2"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="w-3/5">
              {!!currentMenuItem && (
                <ParsedHTML>
                  {currentDescription ??
                    currentMenuItem.attributes.defaultDescription ??
                    ''}
                </ParsedHTML>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="fixed h-full w-full" onClick={closeMenu}></div>
    </div>
  );
}
