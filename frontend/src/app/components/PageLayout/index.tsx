import React, { PropsWithChildren } from 'react';
import { ContextBox, ContextBoxProps } from '@/app/components/ContextBox';
import classNames from 'classnames';

export interface PageLayoutProps extends PropsWithChildren {
  contextBoxProps?: ContextBoxProps;
  contentElement?: 'div' | 'article';
}

export function PageLayout({
  children,
  contextBoxProps,
  contentElement = 'div',
}: PageLayoutProps) {
  const Content = contentElement;
  return (
    <div className="container flex items-start space-x-12 px-4 md:mx-auto lg:max-w-7xl">
      <Content
        className={classNames(
          '',
          !!contextBoxProps ? 'w-2/3 xl:w-3/4' : 'w-full',
        )}
      >
        {children}
      </Content>
      {!!contextBoxProps && (
        <div className="mt-12 hidden w-1/3 md:block xl:w-1/4">
          <ContextBox {...contextBoxProps} />
        </div>
      )}
    </div>
  );
}
