import { ParserProps } from '@/app/types';
import Image from 'next/image';
import { attributesToProps } from 'html-react-parser';
import { PopupImage } from '@/app/components/PopupImage';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';

export interface ParsedImgProps extends ParserProps {}

export function ParsedImg(props: ParserProps) {
  const { src, alt, ...attribs } = props.attribs;
  const fullSrc = src.substring(0, 4) === 'http' ? src : `${STRAPI_URL}${src}`;

  return <PopupImage src={fullSrc} alt={alt} width={500} height={500} />;
}
