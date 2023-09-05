import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import { IArtifact, IPage } from '@/app/types';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { BreadcrumbItem, Breadcrumbs } from '@/app/components/Breadcrumbs';
import React from 'react';
import { PageLayout } from '@/app/components/PageLayout';
import { ScreenshotGrid } from '@/app/components/ScreenshotGrid';
import { PrimaryLink } from '@/app/components/PrimaryLink';

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getContentBySlug<IPage>(
    '/pages',
    params.slug,
    params.lang,
  );
  return {};
}

export default async function ArtifactsRoute({ params }: Props) {
  const artifact = await getContentBySlug<IArtifact>(
    '/artifacts',
    params.slug,
    params.lang,
    '*',
  );
  const { title, subtitle, description, relatedPages, url, images } =
    artifact.data[0].attributes;

  const path: BreadcrumbItem[] = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'Talks and Publications',
      href: '/talks-and-publications',
    },
    {
      id: '3',
      label: title ?? '',
      href: '#',
    },
  ];

  return (
    <PageLayout contextBoxProps={{ relatedPages }}>
      <Breadcrumbs path={path} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <PrimaryLink url={url} />
      <ParsedHTML>{description}</ParsedHTML>
      <ScreenshotGrid screenshots={images?.data} pageTitle={title} />
    </PageLayout>
  );
}
