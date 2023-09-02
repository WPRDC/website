'use client';

import { INavMenuItem } from '@/app/types';
import A from '@/app/components/A';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Modal } from '@/app/components/Modal';
import { useState } from 'react';
import { ParsedHTML } from '@/app/components/ParsedHTML';

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

  const state = useOverlayTriggerState({});
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
      <button onClick={state.open} className="cursor-pointer">
        {primaryLink?.label}
      </button>
      <Modal state={state}>
        <div>
          <div>
            {!!subMenu && !!subMenu.length && (
              <ul>
                {subMenu.map((menuItem) => (
                  <li
                    key={menuItem.id}
                    onMouseEnter={() => setHoveredItem(menuItem.id)}
                    onMouseLeave={() => setHoveredItem(undefined)}
                  >
                    <A href={menuItem.link?.url ?? '#'}>
                      <div>{menuItem.link?.label}</div>
                      {!!menuItem.deatailLine && (
                        <div>{menuItem.deatailLine}</div>
                      )}
                      {console.log('', subMenu) ?? ''}
                    </A>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div></div>
        </div>
      </Modal>
    </li>
  );
}
