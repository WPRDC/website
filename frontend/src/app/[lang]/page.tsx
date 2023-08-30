import React from 'react';
import SearchBar from '@/app/components/SearchBar';
import { getHomePage } from '@/app/lib/data-fetchers';
import A from '@/app/components/A';
import { Blurb } from '@/app/components/Blurb';

export default async function HomePage({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const homepageResponse = await getHomePage();
  const { searchSection, blurbs, publishers } =
    homepageResponse.data.attributes;
  const buttons = searchSection?.buttons ?? [];
  const tiles = blurbs?.tiles ?? [];
  const partners = publishers?.partners ?? [];
  const otherPublishers = publishers?.publishers ?? [];

  return (
    <div className="mx-4 max-w-4xl lg:mx-auto">
      {/* Big Search*/}
      <div className="mt-2 py-6 md:mt-6 lg:mt-12">
        <h2
          className="my-2 text-2xl font-bold leading-tight md:text-3xl lg:text-5xl"
          id="search-label"
        >
          {searchSection?.title}
        </h2>
        <SearchBar aria-labelledby="search-label" />
        <p className="mb-2 py-2 text-sm italic md:text-base">
          {searchSection?.description}
        </p>
        <div className="grid-cols-2">
          {buttons.map((button) => (
            <A
              href={button.buttonURL ?? '#'}
              variant="button"
              buttonStyle={!!button.highlight ? 'primary' : 'default'}
              className="mb-6 mr-6"
            >
              {button.buttonText}
            </A>
          ))}
        </div>
      </div>

      {/*Blurbs*/}
      <div className="border-text my-4 grid grid-cols-1 gap-x-8 gap-y-8 border-y-2 py-8 dark:border-gray-700 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Blurb {...tile} />
        ))}
      </div>

      {/* Partners */}
      <div className="py-10">
        <h2 className="text-center text-3xl font-bold">{publishers?.header}</h2>
        <div className="my-6 text-center text-lg">
          {publishers?.description}
        </div>

        <div className="py-4">
          <div className="mx-auto grid w-fit grid-cols-3 gap-4 pb-4 pt-2">
            {partners.map((partner) => (
              <img
                src="https://placehold.co/140"
                width={140}
                height={140}
                alt={partner.partnerName ?? ''}
              />
            ))}
          </div>

          <div className="mx-auto grid w-fit grid-cols-3 gap-4 py-2 sm:grid-cols-4 lg:grid-cols-6">
            {otherPublishers.map((publisher) => (
              <img
                src="https://placehold.co/120"
                width={120}
                height={120}
                alt={publisher.partnerName ?? ''}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto w-fit items-center py-4 text-xl font-bold md:flex">
          <div>{publishers?.callToActionText}</div>
          <A
            variant="button"
            buttonStyle="primary"
            href={publishers?.button?.buttonURL ?? '#'}
            className="md:ml-8"
          >
            {publishers?.button?.buttonText}
          </A>
        </div>
      </div>
    </div>
  );
}
