'use client';

import { DismissButton, Overlay, SSRProvider, usePopover } from 'react-aria';
import type { AriaPopoverProps } from 'react-aria';
import type { OverlayTriggerState } from '@react-stately/overlays';
import { useRef } from 'react';

export interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

export function Popover({
  children,
  state,
  offset = 22,
  ...props
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div {...popoverProps} ref={popoverRef} className="w-full">
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
