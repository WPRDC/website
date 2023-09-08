import { HeadingTag, ParserProps } from '@/app/types';
import { domToReact } from 'html-react-parser';
import { defaultReplace, makeHeadingID } from '@/app/components/ParsedHTML/lib';
import classNames from 'classnames';
import slugify from 'slugify';

export interface ParsedHeadingProps extends ParserProps {}

export function ParsedHeading(props: ParsedHeadingProps) {
  const { style, ...attribs } = props.attribs;
  const Heading = props.name as HeadingTag;
  const idSlug = makeHeadingID(props.children);

  return (
    <Heading
      {...attribs}
      id={idSlug}
      className={classNames(
        'text-textSecondary dark:text-textSecondaryDark mt-8 font-mono font-semibold',
        {
          'text-3xl': Heading === 'h1' || Heading === 'h2',
          'text-2xl': Heading === 'h3',
          'text-xl': Heading === 'h4',
          'text-lg': Heading === 'h5',
          'text-base': Heading === 'h6',
        },
        props.className,
      )}
    >
      {domToReact(props.children, { replace: defaultReplace })}
    </Heading>
  );
}
