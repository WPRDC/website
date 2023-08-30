import { ParserProps } from '@/app/types';
import Image from 'next/image';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';

export interface ParsedImgProps extends ParserProps {}

export function ParsedImg(props: ParserProps) {
  const { src, alt, ...attribs } = props.attribs;
  const fullSrc = `${STRAPI_URL}${src}`;

  return (
    <Image
      className="border-textSecondary dark:border-textSecondaryDark border"
      src={fullSrc}
      alt={alt}
      width={500}
      height={500}
      {...attribs}
    />
  );
}
