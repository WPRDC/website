import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import { ContextBox } from '@/app/components/ContextBox';
import { IPage } from '@/app/types';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import React from 'react';
import { PageLayout } from '@/app/components/PageLayout';

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
  //
  // if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  // const metadata = page.data[0].attributes.seo;
  //
  // return {
  //   title: metadata.metaTitle,
  //   description: metadata.metaDescription,
  // };
}

export default async function PageRoute({ params }: Props) {
  const page = await getContentBySlug<IPage>(
    '/pages',
    params.slug,
    params.lang,
    '*',
  );
  const { title, subtitle, body, updatedAt, publishedAt, relatedPages } =
    page.data[0].attributes;

  return (
    <PageLayout
      contentElement={'article'}
      contextBoxProps={{
        contents: body,
        relatedPages,
        relatedLinksTitle: 'Links',
      }}
    >
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <ParsedHTML>{body}</ParsedHTML>
    </PageLayout>
  );
}
