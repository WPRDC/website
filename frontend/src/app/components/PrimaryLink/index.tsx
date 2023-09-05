import A from '@/app/components/A';
import React from 'react';

export interface PrimaryLinkProps {
  url?: string | null;
}

export function PrimaryLink({ url }: PrimaryLinkProps) {
  if (!url) return null;
  return (
    <div className="mb-4 text-lg">
      <A external href={url}>
        {url}
      </A>
    </div>
  );
}
