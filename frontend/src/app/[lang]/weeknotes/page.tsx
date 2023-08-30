import { Metadata } from 'next';
import { getBlogPosts, getWeeknotes } from '@/app/lib/data-fetchers';
import React from 'react';
import { ListItem } from '@/app/components/Listing/ListItem';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { WEEKNOTE_AUTHORS } from '@/app/lib/constants';
import { IWeeknote, ReplacerRecord } from '@/app/types';
import A from '@/app/components/A';
import {
  defaultReplacers,
  makeReplacer,
} from '@/app/components/ParsedHTML/lib';
import { ParsedP } from '@/app/components/ParsedHTML/ParsedComponents';
import { Title } from '@/app/components/Title';

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

export default async function WeeknoteListingRoute({ params }: Props) {
  const authorNoteResponses = await Promise.all(
    WEEKNOTE_AUTHORS.map((author) => getWeeknotes(author)),
  );

  const mostRecentNotes: (IWeeknote<string> | null)[] = authorNoteResponses.map(
    (response) => (response.data.length ? response.data[0] : null),
  );

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
  ];

  return (
    <div className="container items-start px-4 md:mx-auto lg:max-w-5xl">
      <Breadcrumbs path={path} />
      <Title>Weeknotes</Title>
      <ParsedHTML>
        Ahoy, swashbuckling doubloons, grace, booty, and strength. The breeze
        falls death like an evil pirate. Winds wave with malaria! corsairs
        hobble with adventure. Salty, clear whales quirky hoist a fine, misty
        lad. Old, cold scallywags fast raid a swashbuckling, big girl. adventure
        is an addled mate.
      </ParsedHTML>
      <div className="my-4 text-4xl">Our most recent weeknotes:</div>
      <nav>
        <ul className="inline-block space-x-3">
          {WEEKNOTE_AUTHORS.map((authorSlug) => (
            <li className="inline-block">
              <A href={`#${authorSlug}`}>
                <span className="capitalize">{authorSlug}</span>
              </A>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 w-full">
        {mostRecentNotes
          .filter((note) => !!note)
          .map((weeknote) => (
            <WeeknoteBlurb weeknote={weeknote} />
          ))}
      </div>
    </div>
  );
}

interface WeeknoteBlurbProps {
  weeknote: IWeeknote<string> | null;
}

function WeeknoteBlurb({ weeknote }: WeeknoteBlurbProps) {
  const author = weeknote?.attributes.author?.data?.attributes;

  return (
    <div
      className="border-textSecondary dark:border-textSecondaryDark mb-4 border-t py-4"
      id={author?.slug ?? undefined}
    >
      <div className="mb-4">
        <div className="mb-2 inline-block text-3xl font-bold">
          {author?.name}
        </div>
        <div className="ml-4 inline-block">
          <A
            href={`/weeknotes/${
              weeknote?.attributes.author?.data?.attributes.slug ?? '#'
            }`}
            className="text-textSecondary dark:text-textSecondaryDark mb-1 font-light italic"
          >
            Read previous weeknotes
          </A>
        </div>
      </div>
      <div className="px-4">
        <ParsedHTML>{weeknote?.attributes.article}</ParsedHTML>
      </div>
    </div>
  );
}
