import React from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

export interface ButtonProps extends AriaButtonProps {
  variant?: 'default' | 'primary' | 'borderless' | 'success';
}

export default function Button(props: ButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { children, variant } = props;

  return (
    <button {...buttonProps} ref={ref}>
      {children}
    </button>
  );
}
