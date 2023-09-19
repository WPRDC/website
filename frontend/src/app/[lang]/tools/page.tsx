import { Metadata } from 'next';
import { getTools } from '@/app/lib/data-fetchers';
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
    <PageLayout>
      <Breadcrumbs path={path} />
      <Title>Tools</Title>
      {/* todo: setup leading content */}
      <CardGrid>
        {tools.map(({ attributes: tool, id }) => (
          <Card
            key={id}
            href={`/tools/${tool.slug}`}
            title={tool.title ?? ''}
            subtitle={tool.subtitle}
            thumbnailURL={`${STRAPI_URL}${tool.thumbnail?.data?.attributes.url}`}
          />
        ))}
      </CardGrid>
    </PageLayout>
  );
}
