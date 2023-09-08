'use client';

import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { INavbarSubMenuItem, INavMenuItem } from '@/app/types';
import Link from 'next/link';
import classNames from 'classnames';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { HiExternalLink } from 'react-icons/hi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

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

  const ref = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setCurrentMenuItem(null);
  }

  const handleMenuClick = (menuItem: INavMenuItem) => () => {
    if (!!currentMenuItem && menuItem.id === currentMenuItem.id) {
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

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={ref} className="top-0 z-50 w-full dark:text-gray-100">
      {/* Navbar */}
      <div className="w-full border-b-2 border-black bg-white py-3 dark:border-slate-800 dark:bg-black">
        <div className="container mx-auto flex w-full max-w-7xl items-center space-x-24">
          <div className="flex-grow lg:flex-grow-0">
            <Logo lightModeURL={logoURL} darkModeURL={darkLogoURL} />
          </div>
          <nav className="hidden h-full md:block">
            <ul className="h-full">
              {menuItems.map((menuItem) => (
                <li key={menuItem.id} className="m-1 inline-block h-full px-1">
                  <button
                    onClick={handleMenuClick(menuItem)}
                    className="dark:hover:text-primary dark:hover:bg-backgroundDark dark:ring-textSecondaryDark ring-textSecondary flex h-full items-center rounded-sm p-2 hover:font-black hover:ring-1"
                  >
                    {menuItem.attributes.primaryLink?.label}
                    {currentMenuItem?.id === menuItem.id ? (
                      <FaChevronUp className="ml-1.5 inline-block text-xs" />
                    ) : (
                      <FaChevronDown className="ml-1.5 inline-block text-xs" />
                    )}
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
        <div className="fixed z-50 w-full border-b-4 border-black bg-white dark:border-slate-800 dark:bg-black">
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
                        <div className="text-lg">
                          {menuItem.link?.label}
                          {menuItem.link?.newTab && (
                            <HiExternalLink className="inline-block text-sm" />
                          )}
                        </div>
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
                                {menuItem.link?.newTab && (
                                  <HiExternalLink className="inline-block text-sm" />
                                )}
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
    </div>
  );
}
