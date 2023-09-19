import { ParserProps } from '@/app/types';
import { attributesToProps, domToReact } from 'html-react-parser';
import { defaultReplace } from '../lib';
import classNames from 'classnames';

export interface ParsedFigureProps extends ParserProps {}

export function ParsedFigure(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <figure
      {...attributesToProps(attribs)}
      className={classNames(
        'mx-auto my-6 flex min-h-[200px] w-fit max-w-3xl flex-col items-center',
        props.className,
      )}
    >
      {domToReact(props.children, { replace: replacer })}
    </figure>
  );
}
