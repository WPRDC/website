import { ParsedHTML } from '@/app/components/ParsedHTML';
import React from 'react';
import { ParsedP } from '@/app/components/ParsedHTML/ParsedComponents';
import { ParserProps, ReplacerRecord } from '@/app/types';
import { makeReplacer } from '@/app/components/ParsedHTML/lib';

export interface BlurbProps {
  header?: string | null;
  description?: string | null;
}

const blurbReplacers: ReplacerRecord = {
  p: (props: ParserProps) => (
    <ParsedP {...props} className="text-start text-sm">
      {props.children}
    </ParsedP>
  ),
};

export function Blurb({ header, description }: BlurbProps) {
  return (
    <div className="">
      <h2 className="text-textSecondary dark:text-textSecondaryDark mb-1 font-mono text-lg font-bold uppercase">
        {header}
      </h2>
      <ParsedHTML
        className="font-sans text-sm"
        replacer={makeReplacer({ ...blurbReplacers })}
      >
        {description ?? ''}
      </ParsedHTML>
    </div>
  );
}
