'use client';

import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { INavbarSubMenuItem, INavMenuItem } from '@/app/types';
import Link from 'next/link';
import classNames from 'classnames';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { HiExternalLink } from 'react-icons/hi';
import { FaChevronDown, FaChevronUp, FaX } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';

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
    setIsOpen(false);
    setCurrentMenuItem(null);
  }

  const handleMenuClick = (menuItem: INavMenuItem) => () => {
    if (!!currentMenuItem && menuItem.id === currentMenuItem.id) {
      setCurrentMenuItem(null);
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
      <div className="w-full border-b-2 border-black bg-white dark:border-slate-800 dark:bg-black lg:flex ">
        <div
          className={classNames(
            'mx-auto w-full max-w-7xl lg:flex lg:items-center lg:justify-between',
          )}
        >
          <div className="flex w-full justify-between p-4 lg:w-fit">
            <Logo lightModeURL={logoURL} darkModeURL={darkLogoURL} />
            <button
              aria-hidden
              className={classNames('p-2 lg:hidden')}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <GiHamburgerMenu
                className={classNames('text-2xl', isOpen ? 'hidden' : 'block')}
              />
              <FaChevronUp
                className={classNames('text-2xl', isOpen ? 'block' : 'hidden')}
              />
            </button>
          </div>
          <nav
            aria-hidden
            className={classNames(
              'h-fit lg:block',
              isOpen ? 'block' : 'hidden',
            )}
          >
            <ul className="">
              {menuItems.map((menuItem) => (
                <li
                  key={menuItem.id}
                  className="m-1 h-fit items-center px-1 lg:inline-block lg:border-none"
                >
                  <button
                    onClick={handleMenuClick(menuItem)}
                    className="dark:hover:text-primary dark:hover:bg-backgroundDark dark:ring-textSecondaryDark ring-textSecondary flex h-full w-full items-center rounded-sm px-2 py-4 hover:font-black hover:ring-1 md:py-2 lg:h-fit lg:w-fit"
                  >
                    {menuItem.attributes.primaryLink?.label}
                    {currentMenuItem?.id === menuItem.id ? (
                      <FaChevronUp className="ml-1.5 inline-block text-xs" />
                    ) : (
                      <FaChevronDown className="ml-1.5 inline-block text-xs" />
                    )}
                  </button>
                  <ul
                    className={classNames(
                      'border-textSecondary ml-4 bg-white dark:bg-black lg:ml-0 lg:w-full lg:border-b',
                      currentMenuItem?.id === menuItem.id
                        ? 'lg:absolute lg:left-0 lg:m-1 lg:pt-1'
                        : 'hidden',
                    )}
                  >
                    <div className="w-full py-2 lg:mx-auto lg:flex lg:max-w-5xl">
                      <div className="w-full lg:w-5/12">
                        {menuItem.attributes.subMenu?.map((subMenuItem) => (
                          <li
                            key={subMenuItem.id}
                            onMouseEnter={handleHover(subMenuItem)}
                          >
                            <Link
                              onClick={closeMenu}
                              href={subMenuItem.link?.url ?? '#'}
                              className="hover:ring-primary dark:hover:bg-backgroundDark decoration-primary my-1 block p-2 hover:bg-amber-100 hover:font-bold hover:ring-2"
                            >
                              <div className="text-lg">
                                {subMenuItem.link?.label}
                                {subMenuItem.link?.newTab && (
                                  <HiExternalLink className="inline-block text-sm" />
                                )}
                              </div>
                              {!!subMenuItem.deatailLine && (
                                <div className="text-textSecondary dark:text-textSecondaryDark text-sm">
                                  {subMenuItem.deatailLine}
                                </div>
                              )}
                            </Link>
                            {!!subMenuItem.subItems &&
                              !!subMenuItem.subItems.length && (
                                <ul className="ml-4">
                                  {subMenuItem.subItems.map((subItem) => (
                                    <li key={subItem.id}>
                                      <Link
                                        onClick={closeMenu}
                                        href={subItem.url ?? '#'}
                                        className="hover:ring-primary dark:hover:bg-backgroundDark decoration-primary my-1 block p-2 hover:bg-amber-100 hover:font-bold hover:ring-2"
                                      >
                                        {subItem.label}
                                        {subMenuItem.link?.newTab && (
                                          <HiExternalLink className="inline-block text-sm" />
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </li>
                        ))}
                      </div>
                      <div className="hidden lg:ml-4 lg:block lg:w-7/12">
                        {!!currentMenuItem && (
                          <ParsedHTML>
                            {currentDescription ??
                              currentMenuItem.attributes.defaultDescription ??
                              ''}
                          </ParsedHTML>
                        )}
                      </div>
                    </div>
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          {/* screen reader navigation */}
          <nav className="sr-only">
            <ul>
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  {menuItem.attributes.primaryLink?.label}
                  <ul>
                    {menuItem.attributes.subMenu?.map((subMenuItem) => (
                      <li
                        key={subMenuItem.id}
                        onMouseEnter={handleHover(subMenuItem)}
                      >
                        <Link
                          onClick={closeMenu}
                          href={subMenuItem.link?.url ?? '#'}
                        >
                          {subMenuItem.link?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
