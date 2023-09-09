import { ITag, Size } from '@/app/types';
import classNames from 'classnames';
import { Tag } from './Tag';

export interface TagsProps {
  tags?: ITag[];
  size?: Size;
}

export function Tags({ tags, size = 'M' }: TagsProps) {
  return (
    <ul
      className={classNames('space-x-2', {
        'px-1.5 py-1 ': size === 'S',
        'px-2.5 py-2': ['M', 'L'].includes(size),
      })}
    >
      {!!tags && tags.map((tag) => <Tag tag={tag} size={size} />)}
    </ul>
  );
}
