import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@/app/components/Breadcrumbs';
import { ITool } from '@/app/types';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';
import { Subtitle } from '@/app/components/Subtitle';
import { ContextBox } from '@/app/components/ContextBox';
import { STRAPI_URL } from '@/app/lib/constants';
import A from '@/app/components/A';
import { PopupImage } from '@/app/components/PopupImage';

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
  const { data: tools } = await getContentBySlug<ITool>(
    '/tools',
    slug,
    lang,
    '*',
  );

  // todo: handle 404 if not posts
  const { title, subtitle, description, url, docURL, githubURL, screenshots } =
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
    <div className="container flex items-start space-x-12 px-4 pt-12 md:mx-auto lg:max-w-7xl">
      <div className="w-2/3">
        <Breadcrumbs path={path} />
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <div className="mb-4 text-lg">
          <A external href={url ?? ''}>
            {url}
          </A>
        </div>
        <ParsedHTML>{description}</ParsedHTML>
        {!!screenshots && (
          <>
            <div className="mb-2 mt-8 text-lg ">Screenshots</div>

            <ul className="inline-block">
              {screenshots.data.map((screenshot) => (
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
      </div>
      <div className="mt-12 hidden w-1/3 md:block">
        <ContextBox title="" docLinks={[docURL]} githubLinks={[githubURL]} />
      </div>
    </div>
  );
}
