import A from '@/app/components/A';
import React from 'react';

export interface PrimaryLinkProps {
  url?: string | null;
  label?: string | null;
  external?: boolean;
}

export function PrimaryLink({ url, label, external = true }: PrimaryLinkProps) {
  if (!url) return null;
  return (
    <div className="mb-4 text-lg">
      <A external={external} href={url}>
        {label ?? url}
      </A>
    </div>
  );
}
