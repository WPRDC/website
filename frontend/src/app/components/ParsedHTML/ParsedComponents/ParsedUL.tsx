import { ParserProps } from '@/app/types';
import { domToReact } from 'html-react-parser';
import { defaultReplace } from '@/app/components/ParsedHTML/lib';
import classNames from 'classnames';

export function ParsedUL(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  return (
    <ul
      {...attribs}
      className={classNames('list-inside list-disc', props.className)}
    >
      {domToReact(props.children, { replace: defaultReplace })}
    </ul>
  );
}
