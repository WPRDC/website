import React from 'react';
import {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
} from 'html-react-parser';
import { ChildNode } from 'domhandler';
import { JSX } from 'react/jsx-runtime';
import { ReplacerRecord } from '@/app/types';
import {
  ParsedA,
  ParsedFigcaption,
  ParsedFigure,
  ParsedHeading,
  ParsedImg,
  ParsedOL,
  ParsedP,
  ParsedUL,
} from './ParsedComponents';
import classNames from 'classnames';
import A from '@/app/components/A';
import slugify from 'slugify';
import IntrinsicElements = JSX.IntrinsicElements;

export function makeHeadingID(headingChildren: ChildNode[]) {
  return headingChildren.reduce(
    (acc, cur) => `${acc}${!!acc ? '-' : ''}${slugify(getChildNodeText(cur))}`,
    '',
  );
}

export function getChildNodeText(node: ChildNode): string {
  switch (node.type) {
    // text is raw text within elements
    case 'text':
      return node.data;
    // Elements eventually have text children or nothing
    case 'tag':
      return makeHeadingID(node.children);
    // the remaining types have no relevant text within them
    default:
      return '';
  }
}

export const defaultReplacers: ReplacerRecord = {
  figure: ParsedFigure,
  figcaption: ParsedFigcaption,
  img: ParsedImg,
  a: ParsedA,
  p: ParsedP,
  h1: ParsedHeading,
  h2: ParsedHeading,
  h3: ParsedHeading,
  h4: ParsedHeading,
  h5: ParsedHeading,
  h6: ParsedHeading,
  ul: ParsedUL,
  ol: ParsedOL,
  br: () => <br />,
};

// only show text when making an excerpt of some rich content
export const excerptReplacer: ReplacerRecord = {
  figure: () => <></>,
  figcaption: () => <></>,
  img: () => <></>,
  a: ParsedA,
  p: ParsedP,
  h1: ParsedP,
  h2: ParsedP,
  h3: ParsedP,
  h4: ParsedP,
  h5: ParsedP,
  h6: ParsedP,
  ul: ParsedUL,
  ol: ParsedOL,
  br: () => <></>,
};

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const makeReplacer =
  (replacers: ReplacerRecord) => (domNode: DOMNode) => {
    if (domNode instanceof Element) {
      const ReplacedElement =
        replacers[domNode.name as keyof IntrinsicElements];
      if (!!ReplacedElement) {
        return (
          <ReplacedElement {...domNode}>{domNode.children}</ReplacedElement>
        );
      } else {
        const Tag = domNode.name as keyof IntrinsicElements;
        const { style, ...props } = attributesToProps(domNode.attribs);
        return (
          <Tag {...props}>
            {domToReact(domNode.children, { replace: makeReplacer(replacers) })}
          </Tag>
        );
      }
    }
    return;
  };

export const defaultReplace = makeReplacer(defaultReplacers);

export const tocReplacer = (domNode: DOMNode) => {
  if (domNode instanceof Element) {
    const tagName = domNode.name;
    if (HEADING_TAGS.includes(domNode.name)) {
      const idSlug = makeHeadingID(domNode.children);
      return (
        <li
          className={classNames('mb-1', {
            '': tagName === 'h2',
            'ml-2': tagName === 'h3',
            'ml-3': tagName === 'h4',
            'ml-4': tagName === 'h5',
            'ml-5': tagName === 'h6',
          })}
        >
          <A href={`#${idSlug}`}>{domToReact(domNode.children)}</A>
        </li>
      );
    }
    return <></>;
  }
};
