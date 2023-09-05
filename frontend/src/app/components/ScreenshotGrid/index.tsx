import { IMedia } from '@/app/types';
import { PopupImage } from '@/app/components/PopupImage';
import { STRAPI_URL } from '@/app/lib/constants';
import React from 'react';

export interface ScreenshotGridProps {
  screenshots?: IMedia[];
  pageTitle?: string | null;
}

export function ScreenshotGrid({
  screenshots,
  pageTitle,
}: ScreenshotGridProps) {
  if (!screenshots || !screenshots.length) return null;
  return (
    <div>
      <div className="my-8 mb-2 text-lg ">Screenshots</div>

      <ul className="inline-block">
        {screenshots.map((screenshot) => (
          <li
            key={screenshot.id}
            className="relative inline-block h-52 max-w-sm p-3"
          >
            <PopupImage
              src={`${STRAPI_URL}${screenshot.attributes.url}`}
              width={800}
              height={200}
              alt={
                screenshot.attributes.alternativeText ??
                `${pageTitle} screenshot`
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
