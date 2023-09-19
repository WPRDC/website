import { IBlog, ListableContentType } from '@/app/types';
import { EXCERPT_SIZE } from '@/app/lib/constants';
import A from '@/app/components/A';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { excerptReplacer, makeReplacer } from '@/app/components/ParsedHTML/lib';

export interface ListItemProps<T extends ListableContentType<string | never>> {
  item: T;
  basePath?: string;
}

export function ListItem<T extends ListableContentType<string | never>>({
  item,
  basePath = '',
}: ListItemProps<T>) {
  const { slug, title, publishedAt, excerpt, article, author, category } =
    item.attributes;

  const text = excerpt || article || '';

  const href = `${basePath}/${slug}`;

  console.log('🧢', href);

  return (
    <li
      key={slug}
      className="border-textSecondary my-1 border-b-2 px-2 py-8 first:border-t-2"
    >
      <div className="mb-2 text-3xl font-bold">
        <A
          variant="unstyled"
          className="decoration-2 hover:underline"
          href={href}
        >
          {title}
        </A>
      </div>
      <div className="text-textSecondary dark:text-textSecondaryDark text-sm">
        <span className="font-light italic">by </span>
        <span className="font-bold">
          {author?.data?.attributes.name ?? 'The WPRDC'}
        </span>
        <span className="font-light italic"> on </span>
        <span className="font-bold">
          {new Date(publishedAt).toLocaleDateString('en-US')}
        </span>
      </div>
      <div className="line-clamp-3">
        <ParsedHTML replacer={makeReplacer(excerptReplacer)}>{text}</ParsedHTML>
      </div>
      <A variant="button" buttonSize="S" buttonStyle="primary" href={href}>
        Read More
      </A>
    </li>
  );
}
