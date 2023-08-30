import slugify from 'slugify';
import { ReactNode } from 'react';
import { Element } from 'html-react-parser';

const HEADINGS_REGEX = /^(#{1,6}[ \t].+)$|^(.+[\r\n][=-]{3,})$/gm;
const HEADING_REGEX = /^(#+)[ \t](.+)$|^(.+)[\r\n]([=-])/;

export interface HeadingDetails {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts the table of contents from a chunk of markdown content based on headings.
 * Inspired by https://jsfiddle.net/remarkablemark/o0mja3hf/
 */
export function extractMarkdownTOC(markdown: string): HeadingDetails[] | null {
  const headings = markdown.match(HEADINGS_REGEX);

  if (headings === null) {
    return null;
  }

  return headings
    .map(extractHeadingDetails)
    .filter(Boolean) as HeadingDetails[];
}

function extractHeadingDetails(
  heading: string,
  index: number,
): HeadingDetails | null {
  const matchArray = heading.match(HEADING_REGEX);
  if (!matchArray) {
    return null;
  }

  // underline version
  if (!!matchArray[3] && !!matchArray[4]) {
    return {
      id: index.toString(),
      text: matchArray[3].trim(),
      level: matchArray[4] === '-' ? 2 : 1,
    };
  }
  // hashtag version
  else {
    return {
      id: index.toString(),
      text: matchArray[2].trim(),
      level: matchArray[1].length,
    };
  }
}

export function nodeToString(node: Element): string {
  if (node.children) return '';
  return '';
}

export function slugifyHeading(heading: ReactNode | ReactNode[]) {}
