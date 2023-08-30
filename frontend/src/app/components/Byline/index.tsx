import { IAuthor } from '@/app/types';
import A from '@/app/components/A';
import { WEEKNOTE_AUTHORS } from '@/app/lib/constants';

export interface BylineProps {
  author?: IAuthor | null;
  timestamp: string;
}

export function Byline({ author, timestamp }: BylineProps) {
  return (
    <div className="text-textSecondary dark:text-textSecondaryDark my-2">
      {!!author && (
        <>
          {WEEKNOTE_AUTHORS.includes(author.attributes?.slug ?? '') && (
            <A href={`/team/${author.attributes.slug}`}>
              {author.attributes.name}
            </A>
          )}

          <span> &mdash; </span>
        </>
      )}
      <span>{new Date(timestamp).toLocaleDateString()}</span>
    </div>
  );
}
