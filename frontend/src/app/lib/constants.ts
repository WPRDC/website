import { JSX } from 'react/jsx-runtime';
import IntrinsicElements = JSX.IntrinsicElements;

export const FALLBACK_SEO = {
  title: 'Western Pennsylvania Regional Data Center (WPRDC)',
  description: 'Open Data for Western Pennsylvania',
};

// length, in characters, of post excerpts in listing.
export const EXCERPT_SIZE = 310;

export const DEFAULT_PAGE_SIZE = 10;
export const WEEKNOTE_AUTHORS: string[] = [
  'bob',
  'liz',
  'david',
  'steve',
  'ross',
];

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';
