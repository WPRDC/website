import { Metadata } from 'next';
import { getBlogPosts, getWeeknotes } from '@/app/lib/data-fetchers';
import React from 'react';
import { ListItem } from '@/app/components/Listing/ListItem';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { Title } from '@/app/components/Title';

type Props = {
  params: {
    lang: string;
    author: string;
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

export default async function WeeknoteAuthorRoute({ params }: Props) {
  const { author } = params;
  const { data: posts } = await getWeeknotes(author);
  const path = [
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
      id: '3',
      label: author,
      href: '/',
    },
  ];

  return (
    <div className="container items-start px-4 md:mx-auto lg:max-w-5xl">
      <Breadcrumbs path={path} />
      <Title className="capitalize">{author}'s Week Notes</Title>
      <ul className="">
        {posts.map((post) => (
          <li key={post.id}>
            <h2 className="text-3xl">
              {new Date(post.attributes.createdAt).toLocaleDateString()}
            </h2>
            <ParsedHTML>{post.attributes.article}</ParsedHTML>
          </li>
        ))}
      </ul>
    </div>
  );
}
