import { ExtractNested, IAuthor, ICategory, ITag } from '@/app/types/models';
import { Element } from 'html-react-parser';
import { JSX } from 'react/jsx-runtime';
import IntrinsicElements = JSX.IntrinsicElements;

export * from './models';

export interface AttributeRecord {}

export interface MetadataRecord {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<
  T extends Record<string, any>,
  M extends MetadataRecord = MetadataRecord,
> {
  data: T;
  meta: M;
}

export type Replacer = (props: ParserProps) => JSX.Element;
export type ReplacerRecord = Partial<Record<keyof IntrinsicElements, Replacer>>;

export type Size = 'S' | 'M' | 'L';
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface ListableContentType<Populate extends string | never = never> {
  attributes: {
    slug: string | null;
    title: string | null;
    author?: {
      data: IAuthor<ExtractNested<Populate, 'author'>> | null;
    };
    tags?: {
      data: ITag<ExtractNested<Populate, 'tags'>>[];
    };
    category?: {
      data: ICategory<ExtractNested<Populate, 'category'>> | null;
    };
    excerpt?: string | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    article: string | null;
  };
}

export interface ParserProps
  extends Pick<Element, 'name' | 'attribs' | 'type' | 'children'> {
  className?: string;
}
