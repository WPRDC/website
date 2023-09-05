'use client';

import React, { RefObject } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

export interface ButtonProps extends AriaButtonProps {
  variant?: 'default' | 'primary' | 'borderless' | 'success';
  buttonRef: RefObject<HTMLButtonElement>;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { buttonProps } = useButton(props, props.buttonRef);
  const { children, variant } = props;

  return (
    <button {...buttonProps} ref={props.buttonRef} className={props.className}>
      {children}
    </button>
  );
}
