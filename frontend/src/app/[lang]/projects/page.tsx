import { Metadata } from 'next';
import { getProjects } from '@/app/lib/data-fetchers';
import React from 'react';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { ParsedHTML } from '@/app/components/ParsedHTML';
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
  const { data: projects } = await getProjects();

  const path = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'Projects',
      href: '/projects',
    },
  ];

  return (
    <PageLayout>
      <Breadcrumbs path={path} />
      <Title>Projects</Title>
      <ParsedHTML>
        Ahoy, swashbuckling doubloons, grace, booty, and strength. The breeze
        falls death like an evil pirate. Winds wave with malaria! corsairs
        hobble with adventure. Salty, clear whales quirky hoist a fine, misty
        lad. Old, cold scallywags fast raid a swashbuckling, big girl. adventure
        is an addled mate.
      </ParsedHTML>
      <CardGrid>
        {projects.map(({ attributes: project }) => (
          <Card
            href={`/projects/${project.slug}`}
            title={project.title ?? ''}
            subtitle={project.subtitle}
            thumbnailURL={`${STRAPI_URL}${project.thumbnail?.data?.attributes.url}`}
          />
        ))}
      </CardGrid>
    </PageLayout>
  );
}
