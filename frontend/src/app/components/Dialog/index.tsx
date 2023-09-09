'use client';

import type { AriaDialogProps } from 'react-aria';
import { useDialog } from 'react-aria';
import { ReactNode, useRef } from 'react';

export interface DialogProps extends AriaDialogProps {
  children: ReactNode;
}

export function Dialog({ children, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
}
