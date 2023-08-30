import { Metadata } from 'next';
import { getBlogPosts } from '@/app/lib/data-fetchers';
import React from 'react';
import { ListItem } from '@/app/components/Listing/ListItem';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';

type Props = {
  params: {
    lang: string;
    category: string;
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

export default async function BlogHomeRoute({ params }: Props) {
  const { data: posts } = await getBlogPosts();
  const path = [
    {
      id: '1',
      label: 'Home',
      href: '/',
    },
    {
      id: '2',
      label: 'News',
      href: '/news',
    },
  ];
  // todo: handle pagination

  return (
    <div className="container items-start px-4 md:mx-auto lg:max-w-5xl">
      <Breadcrumbs path={path} />
      <h1 className="mb-8 text-5xl">News</h1>
      <ul className="">
        {posts.map((post) => (
          <ListItem basePath="/news" item={post} />
        ))}
      </ul>
    </div>
  );
}
