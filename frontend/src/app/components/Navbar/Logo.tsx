'use client';

import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import React from 'react';

export interface LogoProps extends Partial<ImageProps> {
  lightModeURL: string | null;
  darkModeURL: string | null;
}

export default function Logo({
  lightModeURL,
  darkModeURL,
  ...imageProps
}: LogoProps) {
  const width = imageProps.width ?? 384;
  const height = 46;

  return (
    <Link href="/" aria-label="Back to homepage">
      {
        <Image
          src={lightModeURL ?? ''}
          alt="logo"
          width={width}
          height={height}
          className="block dark:hidden"
        />
      }
      {
        <Image
          src={darkModeURL ?? ''}
          alt="logo"
          width={width}
          height={height}
          className="hidden dark:block"
        />
      }
    </Link>
  );
}
