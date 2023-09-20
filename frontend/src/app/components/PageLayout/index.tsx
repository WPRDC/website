import React, { PropsWithChildren } from 'react';
import { ContextBox, ContextBoxProps } from '@/app/components/ContextBox';
import classNames from 'classnames';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { tocReplacer } from '@/app/components/ParsedHTML/lib';

export interface PageLayoutProps extends PropsWithChildren {
  contextBoxProps?: ContextBoxProps;
  contentElement?: 'div' | 'article' | 'section';
}

export function PageLayout({
  children,
  contextBoxProps,
  contentElement = 'section',
}: PageLayoutProps) {
  const Content = contentElement;

  function hasContextContent(contextProps?: ContextBoxProps): boolean {
    if (!contextProps) return false;
    // if there are headers, there will be a TOC
    if (!!contextProps.contents && !!contextProps.contents.match('<h'))
      return true;
    if (!!contextProps.relatedPages && !!contextProps.relatedPages.length)
      return true;
    if (!!contextProps.tags && !!contextProps.tags.length) return true;
    return false;
  }

  return (
    <div className="container relative mx-auto w-screen items-start px-4 lg:flex lg:max-w-5xl lg:space-x-8 xl:max-w-7xl">
      <Content
        className={classNames(
          '',
          hasContextContent(contextBoxProps)
            ? 'w-full lg:w-2/3 xl:w-3/4'
            : 'w-full',
        )}
      >
        {children}
      </Content>
      {hasContextContent(contextBoxProps) && (
        <div className="mt-8 w-full lg:mt-12 lg:block lg:w-1/3 xl:w-1/4">
          <ContextBox {...contextBoxProps} />
        </div>
      )}
    </div>
  );
}
