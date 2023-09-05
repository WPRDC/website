import { IElementsLink, ITag } from '@/app/types';
import A from '@/app/components/A';
import { Tags } from '../Tags';
import React from 'react';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { tocReplacer } from '@/app/components/ParsedHTML/lib';
import {
  FaBook,
  FaDatabase,
  FaGithub,
  FaLink,
  FaPerson,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';

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
  /** other useful links */
  relatedPages?: (IElementsLink | null)[];

  /** title for link section */
  relatedLinksTitle?: string;
}

type LinkCategory = 'doc' | 'github' | 'page';
export function ContextBox({
  contents,
  tags,
  title,
  docLinks = [],
  githubLinks = [],
  relatedPages = [],
  relatedLinksTitle,
}: ContextBoxProps) {
  // create one list of links with their type for logos

  function notNull(l: IElementsLink | null): l is IElementsLink {
    return l !== null;
  }
  const links: IElementsLink[] = relatedPages.filter(notNull);

  return (
    <div className="border-text dark:border-textDark3wsz fixed mt-16 w-72 border p-2">
      {!!contents && !!contents.match('<h') && (
        <>
          <div className="mb-2 text-xs font-bold uppercase">
            {'On this page'}
          </div>
          <ol className="px-1.5 text-sm">
            <ParsedHTML replacer={tocReplacer}>{contents}</ParsedHTML>
          </ol>
        </>
      )}

      {!!links && !!links.length && (
        <>
          <div className="mb-1 text-sm uppercase">
            {relatedLinksTitle ?? 'More Links'}
          </div>
          <ul>
            {!!links &&
              links.map((link) => (
                <li
                  key={link.url}
                  className="mb-1 block overflow-x-clip truncate whitespace-nowrap text-sm"
                >
                  <LinkIcon link={link} />
                  <A href={link.url ?? ''} external={!!link.newTab}>
                    {link.label}
                  </A>
                </li>
              ))}
          </ul>
        </>
      )}

      {!!tags && !!tags.length && (
        <div className="mt-5">
          <div className="mb-2 text-xs font-bold uppercase">Tags</div>
          <Tags tags={tags} size="S" />
        </div>
      )}
    </div>
  );
}

interface LinkIconProps {
  link: IElementsLink;
}
function LinkIcon({ link }: LinkIconProps) {
  const props = { className: 'mr-1 inline-block' };
  switch (link.category) {
    case 'documentation':
      return <FaBook {...props} />;
    case 'repo':
      return <FaGithub {...props} />;
    case 'dataset':
      return <FaDatabase {...props} />;
    case 'team-member':
      return <FaPerson {...props} />;
    default:
      return <FaLink {...props} />;
  }
}
