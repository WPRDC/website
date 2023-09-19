import { Metadata } from 'next';
import { getArtifacts } from '@/app/lib/data-fetchers';
import React from 'react';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { Title } from '@/app/components/Title';
import { Card, CardGrid } from '@/app/components/Card';
import { PageLayout } from '@/app/components/PageLayout';

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
    <PageLayout>
      <Breadcrumbs path={path} />
      <Title>Talks and Publications</Title>
      {/* todo: set up leading content */}
      <CardGrid>
        {artifacts.map(({ attributes: artifact, id }) => (
          <Card
            key={id}
            href={`/talks-and-publications/${artifact.slug}`}
            title={artifact.title ?? ''}
            subtitle={artifact.subtitle}
            thumbnailURL={`${STRAPI_URL}${artifact.primaryImage?.data?.attributes.url}`}
          />
        ))}
      </CardGrid>
    </PageLayout>
  );
}
