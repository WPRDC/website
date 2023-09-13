'use client';

import { AriaSearchFieldProps, useSearchField } from 'react-aria';
import React from 'react';
import { useSearchFieldState } from '@react-stately/searchfield';
import Button from '@/app/components/Button';
import { FaSearch, FaTimes } from 'react-icons/fa';

export interface SearchBarProps extends AriaSearchFieldProps {}

const SEARCH_URL = 'https://data.wprdc.org/dataset';

export default function SearchBar(props: SearchBarProps) {
  const { label } = props;
  const state = useSearchFieldState(props);
  const ref = React.useRef(null);
  const { labelProps, inputProps, clearButtonProps } = useSearchField(
    {
      ...props,
      onSubmit: (text: string) =>
        (window.location.href = `${SEARCH_URL}?q=${text}`),
    },
    state,
    ref,
  );

  return (
    <div>
      <form
        method="GET"
        action={SEARCH_URL}
        className="space-x-2 space-y-4 lg:flex"
      >
        <label {...labelProps}>{label}</label>
        <div className="border-primary focus:border-primary flex w-full items-center border-4 outline-0 dark:text-white lg:max-w-lg">
          <FaSearch className="mx-2 text-3xl" role="presentation" />
          <input
            {...inputProps}
            name="q"
            ref={ref}
            className="placeholder:text-textSecondary dark:placehoder:text-textSecondaryDark flex-grow border-0 bg-inherit px-2 py-2 text-xl outline-0"
          />
          {state.value !== '' && (
            <Button {...clearButtonProps}>
              <FaTimes className="mx-2 text-3xl" />
            </Button>
          )}
        </div>
        <Button
          className="bg-primary text-text border-text dark:border-text inline-block border-2 px-6 py-2 font-bold uppercase decoration-2 shadow-md hover:shadow-xl active:shadow"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
