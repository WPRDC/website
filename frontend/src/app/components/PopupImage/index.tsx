'use client';

import Image, { ImageProps } from 'next/image';
import React from 'react';
import { useOverlayTriggerState } from '@react-stately/overlays';
import classNames from 'classnames';
import { Modal } from '@/app/components/Modal';

export interface PopupImageProps extends ImageProps {}

export function PopupImage({ className, ...thumbnailProps }: PopupImageProps) {
  const state = useOverlayTriggerState({});
  const { width, height, fill, ...detailProps } = thumbnailProps;
  return (
    <div className={classNames('h-full w-fit max-w-full', className)}>
      <button
        onClick={state.open}
        className="border-textSecondary dark:border-textSecondaryDark relative h-fit w-fit border shadow-lg hover:shadow-2xl active:shadow-sm"
      >
        <Image {...thumbnailProps} className={classNames('')} />
      </button>
      <Modal state={state} isDismissable>
        <Image {...detailProps} width={1200} height={600} />
      </Modal>
    </div>
  );
}
