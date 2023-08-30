'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { i18n } from '@/app/lib/i18n-config';
import classNames from 'classnames';
import { IElementsLink } from '@/app/types';
import { HiExternalLink } from 'react-icons/hi';

export interface NavLinkProps extends IElementsLink {}

function isCurrentPath(url: string, currentPath: string): boolean {
  if (url === currentPath) return true;
  // check with local paths added
  for (const locale of i18n.locales) {
    if (`${locale}${url}` === `${currentPath.slice(1)}/`) return true;
  }
  return false;
}

export default function NavLink(props: NavLinkProps) {
  const path = usePathname();
  const url = props.url ?? '#';

  return (
    <li className="flex items-center">
      <Link
        href={url ?? '#'}
        target={!!props.newTab ? '_blank' : undefined}
        className={classNames(
          'flex items-center text-lg font-bold underline md:text-sm lg:text-base',
          isCurrentPath(url, path) && 'no-underline',
        )}
      >
        {props.label}
      </Link>
      {!!props.newTab && <HiExternalLink className="text-sm" />}
    </li>
  );
}
