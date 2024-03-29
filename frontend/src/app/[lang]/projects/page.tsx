import { Metadata } from 'next';
import { getProjects } from '@/app/lib/data-fetchers';
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
  return {
    title: 'WPRDC | Projects',
  };
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
      {/* todo: setup leading content */}
      <CardGrid>
        {projects.map(({ attributes: project, id }) => (
          <Card
            key={id}
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
