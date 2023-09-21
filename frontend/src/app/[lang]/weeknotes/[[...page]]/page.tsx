import { Metadata } from 'next';
import { getWeeknotes } from '@/app/lib/data-fetchers';
import React from 'react';
import { ListItem } from '@/app/components/Listing/ListItem';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { Title } from '@/app/components/Title';
import { PaginationControl } from '@/app/components/PaginationControl';
import { Listing } from '@/app/components/Listing';
import { PageLayout } from '@/app/components/PageLayout';
import { DEFAULT_PAGE_SIZE } from '@/app/lib/constants';
import A from '@/app/components/A';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { excerptReplacer, makeReplacer } from '@/app/components/ParsedHTML/lib';

type Props = {
  params: {
    lang: string;
    page: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'WPRDC | Weeknotes',
    description: 'Brief weekly updates from the WPRDC.',
  };
}

export default async function BlogHomeRoute({ params }: Props) {
  const { page } = params;
  const pageNum = parseInt(page ?? 1);

  const { data: posts, meta } = await getWeeknotes(pageNum, DEFAULT_PAGE_SIZE);
  const { pageCount } = meta.pagination;

  const path = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'Weeknotes',
      href: '/weeknote',
    },
  ];

  return (
    <PageLayout>
      <Breadcrumbs path={path} />
      <section>
        <Title>Weeknotes</Title>
        <PaginationControl
          path="/blog"
          currentPage={pageNum ?? 0}
          pageCount={pageCount}
        />
        <Listing>
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-textSecondary my-1 border-b-2 px-2 py-8 first:border-t-2"
            >
              <div className="mb-2 text-3xl font-bold">
                <A
                  variant="unstyled"
                  className="decoration-2 hover:underline"
                  href={`/weeknotes/post/${post.id}`}
                >
                  Week of{' '}
                  {new Date(post.attributes.publishedAt).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    },
                  )}
                </A>
              </div>
              <div className="my-4">
                <ParsedHTML replacer={makeReplacer(excerptReplacer)}>
                  {post.attributes.article}
                </ParsedHTML>
              </div>
              <A
                variant="button"
                buttonSize="S"
                buttonStyle="primary"
                href={`/weeknotes/post/${post.id}`}
              >
                Read More
              </A>
            </li>
          ))}
        </Listing>
        <PaginationControl
          path="/blog"
          currentPage={pageNum ?? 0}
          pageCount={pageCount}
        />
      </section>
    </PageLayout>
  );
}
