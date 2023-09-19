import { ParserProps } from '@/app/types';
import Image from 'next/image';
import { attributesToProps } from 'html-react-parser';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';

export interface ParsedImgProps extends ParserProps {}

export function ParsedImg(props: ParserProps) {
  const { src, alt, ...attribs } = props.attribs;
  const fullSrc = src.substring(0, 4) === 'http' ? src : `${STRAPI_URL}${src}`;

  return (
    <Image
      className="border-textSecondary dark:border-textSecondaryDark border"
      src={fullSrc}
      alt={alt}
      width={500}
      height={500}
    />
  );
}
