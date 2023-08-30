import { ListableContentType } from '@/app/types';
import React from 'react';
import { ListItem } from './ListItem';

export interface ListingProps {
  items: ListableContentType[];
}

export function Listing({ items }: ListingProps) {
  return (
    <ul className="">
      {items.map((item) => (
        <ListItem item={item} />
      ))}
    </ul>
  );
}
