import { ParserProps } from '@/app/types';
import A from '@/app/components/A';
import { domToReact } from 'html-react-parser';
import { defaultReplace } from '@/app/components/ParsedHTML/lib';
import classNames from 'classnames';

export interface ParsedAProps extends ParserProps {}

export function ParsedA(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  return (
    <A {...attribs} className={classNames('font-sans', props.className)}>
      {domToReact(props.children, { replace: defaultReplace })}
    </A>
  );
}
