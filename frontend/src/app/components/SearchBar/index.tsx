'use client';

import { AriaSearchFieldProps, useSearchField } from 'react-aria';
import React from 'react';
import { useSearchFieldState } from '@react-stately/searchfield';
import Button from '@/app/components/Button';
import { FaSearch, FaTimes } from 'react-icons/fa';

export interface SearchBarProps extends AriaSearchFieldProps {}

export default function SearchBar(props: SearchBarProps) {
  const { label } = props;
  const state = useSearchFieldState(props);
  const ref = React.useRef(null);
  const { labelProps, inputProps, clearButtonProps } = useSearchField(
    props,
    state,
    ref,
  );

  return (
    <div>
      <label {...labelProps}>{label}</label>
      <div className="border-primary focus:border-primary flex w-full max-w-lg items-center border-4 outline-0 dark:text-white">
        <FaSearch className="mx-2 text-3xl" />
        <input
          placeholder="Dog Licenses"
          {...inputProps}
          ref={ref}
          className="flex-grow border-0 bg-inherit px-2 py-2 text-xl outline-0"
        />
        {state.value !== '' && (
          <Button {...clearButtonProps}>
            <FaTimes className="mx-2 text-3xl" />
          </Button>
        )}
      </div>
    </div>
  );
}
