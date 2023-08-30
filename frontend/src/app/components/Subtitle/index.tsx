import React, { PropsWithChildren } from 'react';

export interface SubtitleProps extends PropsWithChildren<{}> {}
export function Subtitle(props: SubtitleProps) {
  if (!props.children) return undefined;
  return <div className="mb-4 mt-8 text-2xl">{props.children}</div>;
}
