import { ListableContentType } from '@/app/types';
import React, { PropsWithChildren } from 'react';
import { ListItem } from './ListItem';
export { ListItem };
export interface ListingProps extends PropsWithChildren {}

export function Listing({ children }: ListingProps) {
  return <ul className="">{children}</ul>;
}
