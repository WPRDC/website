import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import { ContextBox } from '@/app/components/ContextBox';
import { IArtifact, IMedia, IPage } from '@/app/types';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { PopupImage } from '@/app/components/PopupImage';
import { STRAPI_URL } from '@/app/lib/constants';
import { BreadcrumbItem, Breadcrumbs } from '@/app/components/Breadcrumbs';
import React from 'react';

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
  const { title, subtitle, description, links, primaryImage, images } =
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
    <div className="container flex items-start space-x-12 px-4 md:mx-auto lg:max-w-7xl">
      <article className="w-3/4">
        <Breadcrumbs path={path} />
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <ParsedHTML>{description}</ParsedHTML>
        {!!primaryImage && (
          <PopupImage
            src={`${STRAPI_URL}${primaryImage.data?.attributes.url}`}
            width={500}
            height={200}
            alt={
              primaryImage.data?.attributes.alternativeText ??
              `${title} screenshot`
            }
            className="mx-auto"
          />
        )}

        {!!images && !!images.data?.length && (
          <>
            <div className="mb-2 mt-8 text-lg ">Screenshots</div>
            <ul className="inline-block">
              {images.data.map((screenshot) => (
                <li
                  key={screenshot.id}
                  className="relative inline-block h-52 max-w-sm p-3"
                >
                  <PopupImage
                    src={`${STRAPI_URL}${screenshot.attributes.url}`}
                    width={800}
                    height={200}
                    alt={
                      screenshot.attributes.alternativeText ??
                      `${title} screenshot`
                    }
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
      <div className="hidden w-1/4 md:block">
        <ContextBox
          contents={description}
          relatedLinks={links}
          relatedLinksTitle="Links"
        />
      </div>
    </div>
  );
}
