import { Metadata } from 'next';
import { getTools } from '@/app/lib/data-fetchers';
import React from 'react';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';
import Image from 'next/image';

type Props = {
  params: {
    lang: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {};
  //
  // if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  // const metadata = page.data[0].attributes.seo;
  //
  // return {
  //   title: metadata.metaTitle,
  //   description: metadata.metaDescription,
  // };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';

export default async function ToolListingRoute({ params }: Props) {
  const { data: tools } = await getTools();

  const path = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'Tools',
      href: '/tools',
    },
  ];

  return (
    <div className="container items-start px-4 md:mx-auto lg:max-w-5xl">
      <Breadcrumbs path={path} />
      <Title>Tools</Title>
      <ParsedHTML>
        Ahoy, swashbuckling doubloons, grace, booty, and strength. The breeze
        falls death like an evil pirate. Winds wave with malaria! corsairs
        hobble with adventure. Salty, clear whales quirky hoist a fine, misty
        lad. Old, cold scallywags fast raid a swashbuckling, big girl. adventure
        is an addled mate.
      </ParsedHTML>
      <ul>
        {tools.map(({ attributes: tool }) => (
          <li
            key={tool.slug}
            className="border-textSecondary dark:border-textSecondaryDark flex flex-row-reverse border-2"
          >
            <div className="h-60 flex-grow">
              <div className="text-3xl font-bold">{tool.title}</div>
              <div>{tool.subtitle}</div>
            </div>
            {!!tool.thumbnail && (
              <div className="relative w-1/3">
                <Image
                  src={`${STRAPI_URL}${tool.thumbnail.data?.attributes.url}`}
                  alt={tool.thumbnail.data?.attributes.name ?? ''}
                  fill
                  className="object-none"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
