'use client';

import React, { useState } from 'react';
import type { AriaModalOverlayProps } from '@react-aria/overlays';
import { Overlay, useModalOverlay } from '@react-aria/overlays';
import { CSSTransition } from 'react-transition-group';
import { OverlayTriggerState } from '@react-stately/overlays';
import { FaXmark } from 'react-icons/fa6';

interface ModalProps extends AriaModalOverlayProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

export function Modal(props: ModalProps) {
  const { children, state } = props;

  const ref = React.useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  const [exited, setExited] = useState(!state.isOpen);

  // Don't render anything if the modal is not open, and we're not animating out.
  if (!(state.isOpen || !exited)) {
    return null;
  }

  return (
    // Animate opacity and backdrop blur of underlay
    <Overlay>
      <CSSTransition
        in={state.isOpen}
        appear
        onEntered={() => setExited(false)}
        onExited={() => setExited(true)}
        timeout={{ enter: 0, exit: 0 }}
        classNames={{
          enter: 'opacity-0',
          enterDone: 'opacity-1 backdrop-blur-sm transition ease-linear',
          exit: 'opacity-0 backdrop-blur-none transition ease-out',
        }}
      >
        <div
          className="z-100 fixed inset-0 flex justify-center bg-slate-400/20"
          {...underlayProps}
        >
          <div
            {...modalProps}
            ref={ref}
            onClick={state.close}
            className="z-1 dark:border-textSecondaryDark border-textSecondary relative top-[10%] h-fit border-2 shadow-2xl focus:outline-none"
          >
            <button
              aria-label="close"
              className="border-textSecondary dark:border-textSecondaryDark bg-background dark:bg-backgroundDark absolute right-4 top-4 border shadow-lg hover:bg-red-500 hover:shadow-2xl"
              onClick={state.close}
            >
              <FaXmark />
            </button>
            {children}
          </div>
        </div>
      </CSSTransition>
    </Overlay>
  );
}
