import React, { PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
import { UrlObject } from 'url';
import { Size } from '@/app/types';
import { HiExternalLink } from 'react-icons/hi';

export interface AProps extends PropsWithChildren<Omit<LinkProps, 'href'>> {
  href?: string | (string & UrlObject);
  variant?: 'default' | 'button' | 'unstyled';
  buttonStyle?: 'default' | 'primary' | 'borderless' | 'success';
  buttonSize?: Size;
  external?: boolean;
  newTab?: boolean;
  className?: string;
}

export default function A(props: AProps) {
  const {
    href = '',
    children,
    variant,
    buttonStyle,
    buttonSize = 'M',
    newTab = false,
    external = false,
    className,
    shallow,
    replace,
  } = props;

  const Component: 'a' | typeof Link = external ? 'a' : Link;
  console.log(external, shallow, replace);
  return (
    <Component
      href={href}
      target={newTab ? '_blank' : ''}
      rel="noreferrer"
      shallow={shallow}
      replace={replace}
      className={
        variant !== 'unstyled'
          ? classNames(
              'font-bold',
              variant === 'button'
                ? 'inline-block border border-black uppercase decoration-2 shadow-md hover:shadow-xl active:shadow dark:border-gray-300'
                : 'focus:bg-primary hover:bg-primary hover:text-text underline decoration-2',
              variant === 'button' &&
                buttonStyle === 'primary' &&
                'bg-primary text-text border-text dark:border-text border-2',
              {
                'px-2 py-1 text-sm': variant === 'button' && buttonSize === 'S',
                'px-6 py-2':
                  variant === 'button' && ['M', 'L'].includes(buttonSize),
              },
              className,
            )
          : className
      }
    >
      {children}
      {external && <HiExternalLink className="inline-block text-sm" />}
    </Component>
  );
}
