import { ParserProps } from '@/app/types';
import { attributesToProps, domToReact } from 'html-react-parser';
import { defaultReplace } from '../lib';
import classNames from 'classnames';

export interface ParsedFigcaptionProps extends ParserProps {}

export function ParsedFigcaption(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <figcaption
      {...attributesToProps(attribs)}
      className={classNames(
        'text-textSecondary dark:text-textSecondaryDark max-w-2xl py-0.5 text-center font-mono italic',
        props.className,
      )}
    >
      {domToReact(props.children, { replace: replacer })}
    </figcaption>
  );
}
