import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@/app/components/Breadcrumbs';
import { IProject } from '@/app/types';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { PageLayout } from '@/app/components/PageLayout';
import { PrimaryLink } from '@/app/components/PrimaryLink';
import { ScreenshotGrid } from '@/app/components/ScreenshotGrid';

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = params;
  const { data: tools } = await getContentBySlug<IProject>(
    '/tools',
    slug,
    lang,
    '*',
  );
  return {
    title: `WPRDC | ${tools[0].attributes.title}`,
  };
}

export default async function BlogRoute({ params }: Props) {
  const { slug, lang } = params;
  const { data: tools } = await getContentBySlug<IProject>(
    '/tools',
    slug,
    lang,
    '*',
  );

  // todo: handle 404 if not posts
  const { title, subtitle, description, url, githubURL, screenshots } =
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
      href: '#',
    },
  ];

  return (
    <PageLayout>
      <Breadcrumbs path={path} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <PrimaryLink url={url} />
      <ParsedHTML>{description}</ParsedHTML>
      <ScreenshotGrid screenshots={screenshots?.data} />
    </PageLayout>
  );
}
