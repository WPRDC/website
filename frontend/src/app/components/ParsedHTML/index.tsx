import parse, { HTMLReactParserOptions } from 'html-react-parser';
import React from 'react';
import { defaultReplace } from '@/app/components/ParsedHTML/lib';
import classNames from 'classnames';

export interface ParsedHTMLProps {
  id?: string;
  children?: string | null;
  className?: string;
  replacer?: HTMLReactParserOptions['replace'];
}

export function ParsedHTML({
  children,
  className,
  replacer,
  id,
}: ParsedHTMLProps) {
  return (
    <div className={classNames('font-sans text-lg', className)} id={id}>
      {parse(children ?? '', {
        replace: replacer ?? defaultReplace,
      })}
    </div>
  );
}
