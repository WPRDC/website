import { ParserProps } from '@/app/types';
import { domToReact } from 'html-react-parser';
import { defaultReplace } from '@/app/components/ParsedHTML/lib';
import classNames from 'classnames';

export function ParsedLI(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;
  return (
    <li className={classNames(props.className)}>
      {domToReact(props.children, { replace: replacer })}
    </li>
  );
}
