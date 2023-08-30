import { ParserProps } from '@/app/types';
import { domToReact } from 'html-react-parser';
import { defaultReplace } from '@/app/components/ParsedHTML/lib';
import classNames from 'classnames';

export function ParsedP(props: ParserProps) {
  const { style, ...attribs } = props.attribs;

  return (
    <p
      {...attribs}
      className={classNames(
        'mb-4 mt-1 text-justify text-lg leading-relaxed',
        props.className,
      )}
    >
      {domToReact(props.children, { replace: defaultReplace })}
    </p>
  );
}
