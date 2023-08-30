import { HTMLProps } from 'react';
import { HeadingTag } from '@/app/types';
import classNames from 'classnames';

export interface TitleProps extends HTMLProps<HTMLHeadingElement> {
  headingTag?: HeadingTag;
}

export function Title(props: TitleProps) {
  const Heading = props.headingTag ?? 'h1';
  return (
    <Heading
      className={classNames('mb-4 mt-8 text-5xl font-bold', props.className)}
    >
      {props.children}
    </Heading>
  );
}
