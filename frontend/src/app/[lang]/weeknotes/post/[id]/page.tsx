import { Metadata } from 'next';
import { getContentByID, getContentBySlug } from '@/app/lib/data-fetchers';
import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@/app/components/Breadcrumbs';
import { IBlog, IWeeknote } from '@/app/types';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { Byline } from '@/app/components/Byline';
import { PageLayout } from '@/app/components/PageLayout';

type Props = {
  params: {
    lang: string;
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, lang } = params;
  const { data: weeknote } = await getContentByID<IWeeknote>(
    '/weeknotes',
    id,
    lang,
    '*',
  );
  const dateString = new Date(
    weeknote.attributes.publishedAt,
  ).toLocaleDateString();

  return {
    title: `WPRDC | Weeknote ${dateString}`,
  };
}

export default async function BlogRoute({ params }: Props) {
  const { id, lang } = params;
  const { data: weeknote } = await getContentByID<IWeeknote>(
    '/weeknotes',
    id,
    lang,
    '*',
  );

  const { article, author, publishedAt } = weeknote.attributes;

  const dateString = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const path: BreadcrumbItem[] = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'Weeknotes',
      href: '/weeknotes',
    },
    {
      id: '4',
      label: dateString ?? '',
      href: `#`,
    },
  ];

  return (
    <PageLayout
      contextBoxProps={{ contents: article }}
      contentElement="article"
    >
      <Breadcrumbs path={path} />
      <Title>Week of {dateString}</Title>
      <ParsedHTML>{article}</ParsedHTML>
    </PageLayout>
  );
}
