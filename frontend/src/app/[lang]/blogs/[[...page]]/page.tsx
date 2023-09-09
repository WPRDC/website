import { Metadata } from 'next';
import { getBlogPosts } from '@/app/lib/data-fetchers';
import React from 'react';
import { ListItem } from '@/app/components/Listing/ListItem';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { Title } from '@/app/components/Title';
import { PaginationControl } from '@/app/components/PaginationControl';
import { Listing } from '@/app/components/Listing';
import { PageLayout } from '@/app/components/PageLayout';

type Props = {
  params: {
    lang: string;
    page: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
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

export default async function BlogHomeRoute({ params }: Props) {
  const { page } = params;
  const pageNum = parseInt(page);

  const { data: posts, meta } = await getBlogPosts(undefined, pageNum, 2);
  const { pageCount } = meta.pagination;

  const path = [
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
  ];

  return (
    <PageLayout>
      <Breadcrumbs path={path} />
      <section>
        <Title>News</Title>
        <PaginationControl
          path="/blogs"
          currentPage={pageNum ?? 0}
          pageCount={pageCount}
        />
        <Listing>
          {posts.map((post) => (
            <ListItem key={post.id} basePath="/blog" item={post} />
          ))}
        </Listing>
        <PaginationControl
          path="/blogs"
          currentPage={pageNum ?? 0}
          pageCount={pageCount}
        />
      </section>
    </PageLayout>
  );
}
