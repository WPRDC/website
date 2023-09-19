import qs from 'qs';
import { getStrapiURL } from './api-helpers';
import { StrapiResponse } from '@/app/types';

export async function fetchAPI<T extends object = {}>(
  path: string,
  queryParams: object = {},
  options: object = {},
): Promise<StrapiResponse<T>> {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true, // prettify URL
    });
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ''}`,
    )}`;
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const result = (await response.json()) as StrapiResponse<T>;

    return result;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
}
