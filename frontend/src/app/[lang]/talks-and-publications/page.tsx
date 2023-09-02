import { Metadata } from 'next';
import { getArtifacts, getTools } from '@/app/lib/data-fetchers';
import React from 'react';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';
import { Card } from '@/app/components/Card';

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
  const { data: artifacts } = await getArtifacts();

  const path = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'Talks and Publications',
      href: '#',
    },
  ];

  return (
    <div className="container px-4 md:mx-auto lg:max-w-5xl">
      <Breadcrumbs path={path} />
      <Title>Talks and Publications</Title>
      <ParsedHTML>
        Ahoy, swashbuckling doubloons, grace, booty, and strength. The breeze
        falls death like an evil pirate. Winds wave with malaria! corsairs
        hobble with adventure. Salty, clear whales quirky hoist a fine, misty
        lad. Old, cold scallywags fast raid a swashbuckling, big girl. adventure
        is an addled mate.
      </ParsedHTML>
      <ul className="my-8 grid grid-cols-3 items-stretch gap-6">
        {artifacts.map(({ attributes: artifact }) => (
          <Card
            href={`/talks-and-publications/${artifact.slug}`}
            title={artifact.title ?? ''}
            subtitle={artifact.subtitle}
            thumbnailURL={`${STRAPI_URL}${artifact.primaryImage?.data?.attributes.url}`}
          />
        ))}
      </ul>
    </div>
  );
}
