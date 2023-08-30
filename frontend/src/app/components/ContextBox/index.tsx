import { HeadingDetails, slugifyHeading } from '@/app/lib/markdown-utils';
import classNames from 'classnames';
import { ITag } from '@/app/types';
import A from '@/app/components/A';
import { Tags } from '../Tags';
import React from 'react';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { tocReplacer } from '@/app/components/ParsedHTML/lib';
import { FaBook, FaGithub } from 'react-icons/fa6';

export interface ContextBoxProps {
  title?: string;
  /** contents of page to extract a TOC from */
  contents?: string | null;
  /** set of tags for the page*/
  tags?: ITag[];
  /** documentation links */
  docLinks?: (string | null)[];
  /** links to relevant repos */
  githubLinks?: (string | null)[];
}

type LinkCategory = 'doc' | 'github';
export function ContextBox({
  contents,
  tags,
  title,
  docLinks = [],
  githubLinks = [],
}: ContextBoxProps) {
  const toc = <ParsedHTML replacer={tocReplacer}>{contents}</ParsedHTML>;

  // create one list of links with their type for logos
  const links: [string, LinkCategory][] = [
    ...githubLinks?.map(
      (link) => [link ?? '', 'github'] as [string, LinkCategory],
    ),
    ...docLinks?.map((link) => [link ?? '', 'doc'] as [string, LinkCategory]),
  ];

  return (
    <div className="border-text dark:border-textDark3wsz fixed mt-16 w-72 border p-2">
      {title !== '' && (
        <div className="mb-2 text-xs font-bold uppercase">
          {title ?? 'On this page'}
        </div>
      )}
      {!!contents && (
        <ol className="px-1.5 text-sm">
          <ParsedHTML replacer={tocReplacer}>{contents}</ParsedHTML>
        </ol>
      )}

      {!!links && !!links.length && (
        <>
          <div className="text-sm uppercase">More Links</div>
          <ul>
            {!!links &&
              links.map(([url, category]) => (
                <li
                  key={url}
                  className="mb-1 block overflow-x-clip truncate whitespace-nowrap text-sm"
                >
                  {category === 'doc' && (
                    <FaBook className="mr-1 inline-block" />
                  )}
                  {category === 'github' && (
                    <FaGithub className="mr-1 inline-block" />
                  )}
                  <A className="" href={url ?? ''} external>
                    {url}
                  </A>
                </li>
              ))}
          </ul>
        </>
      )}

      {!!githubLinks && !!githubLinks.length && <ul></ul>}

      {!!tags && !!tags.length && (
        <div className="mt-5">
          <div className="mb-2 text-xs font-bold uppercase">Tags</div>
          <Tags tags={tags} size="S" />
        </div>
      )}
    </div>
  );
}
