'use client';

import { INavMenuItem } from '@/app/types';
import A from '@/app/components/A';
import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { useRef, useState } from 'react';
import { Popover } from '@/app/components/Popover';
import { useOverlayTrigger } from 'react-aria';
import Button from '@/app/components/Button';
import { Dialog } from '@/app/components/Dialog';
import Link from 'next/link';

interface NavItem {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  subMenu: NavItem[];
}

export type NavbarMenuDropdownProps = INavMenuItem['attributes'];

export function NavbarMenuItem({
  primaryLink,
  subMenu,
  defaultDescription,
}: NavbarMenuDropdownProps) {
  const [hoveredItem, setHoveredItem] = useState<number>();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState({});
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    triggerRef,
  );

  const hasMenu = !!subMenu && !!subMenu.length;

  if (!hasMenu) {
    return (
      <li>
        <A href={primaryLink?.url ?? '#'} external={!!primaryLink?.newTab}>
          {primaryLink?.label}
        </A>
      </li>
    );
  }

  return (
    <li>
      <Button
        {...triggerProps}
        buttonRef={triggerRef}
        className="cursor-pointer"
      >
        {primaryLink?.label}
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={triggerRef} placement="bottom">
          <div className="bg-white dark:bg-black"></div>
        </Popover>
      )}
    </li>
  );
}
