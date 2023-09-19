import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@/app/components/Breadcrumbs';
import { IBlog } from '@/app/types';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { Byline } from '@/app/components/Byline';
import { PageLayout } from '@/app/components/PageLayout';

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

export default async function BlogRoute({ params }: Props) {
  const { category, slug, lang } = params;
  const { data: posts } = await getContentBySlug<IBlog>(
    '/blogs',
    slug,
    lang,
    '*',
  );

  // todo: handle 404 if not posts
  const { title, subtitle, article, author, publishedAt } = posts[0].attributes;
  const path: BreadcrumbItem[] = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'Blog',
      href: '/blog',
    },
    {
      id: '4',
      label: title ?? '',
      href: `/blog/post/${slug}`,
    },
  ];

  return (
    <PageLayout
      contextBoxProps={{ contents: article }}
      contentElement="article"
    >
      <Breadcrumbs path={path} />
      <Title>{title}</Title>
      <Byline author={author?.data} timestamp={publishedAt} />
      <Subtitle>{subtitle}</Subtitle>
      <ParsedHTML>{article}</ParsedHTML>
    </PageLayout>
  );
}
