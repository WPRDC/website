'use client';

import React, { RefObject, useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

export interface ButtonProps extends AriaButtonProps {
  variant?: 'default' | 'primary' | 'borderless' | 'success';
  buttonRef?: RefObject<HTMLButtonElement>;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, props.buttonRef ?? ref);
  const { children, variant } = props;

  return (
    <button {...buttonProps} ref={props.buttonRef} className={props.className}>
      {children}
    </button>
  );
}
