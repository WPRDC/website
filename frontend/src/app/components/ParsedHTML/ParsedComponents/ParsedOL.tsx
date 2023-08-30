import { ParserProps } from '@/app/types';
import { domToReact } from 'html-react-parser';
import { defaultReplace } from '@/app/components/ParsedHTML/lib';
import classNames from 'classnames';

export function ParsedOL(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  return (
    <ul
      {...attribs}
      className={classNames('list-inside list-decimal', props.className)}
    >
      {domToReact(props.children, { replace: defaultReplace })}
    </ul>
  );
}
