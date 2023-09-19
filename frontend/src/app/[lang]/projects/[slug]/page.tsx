import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@/app/components/Breadcrumbs';
import { ITool } from '@/app/types';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { ScreenshotGrid } from '@/app/components/ScreenshotGrid';
import { PageLayout } from '@/app/components/PageLayout';
import { PrimaryLink } from '@/app/components/PrimaryLink';

type Props = {
  params: {
    lang: string;
    category: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {};
}

export default async function ProjectRoute({ params }: Props) {
  const { category, slug, lang } = params;
  const { data: tools } = await getContentBySlug<ITool>(
    '/projects',
    slug,
    lang,
    '*',
  );

  // todo: handle 404 if not posts
  const { title, subtitle, description, url, screenshots, relatedPages } =
    tools[0].attributes;
  const path: BreadcrumbItem[] = [
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
    {
      id: '3',
      label: title ?? '',
      href: '/tools',
    },
  ];

  return (
    <PageLayout contextBoxProps={{ relatedPages: relatedPages }}>
      <Breadcrumbs path={path} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <PrimaryLink url={url} />
      <ParsedHTML>{description}</ParsedHTML>
      <ScreenshotGrid screenshots={screenshots?.data} pageTitle={title} />
    </PageLayout>
  );
}
