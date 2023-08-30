import { fetchAPI } from '@/app/lib/fetch-api';
import {
  IBlog,
  IGlobal,
  IHome,
  IPage,
  ITool,
  IWeeknote,
  StrapiResponse,
} from '@/app/types';

export async function getContentBySlug<T>(
  path: string,
  slug: string,
  lang: string,
  populate?: string,
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const queryParams = { filters: { slug }, locale: lang, populate };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchAPI<T[]>(path, queryParams, options);
}

export async function requestData<T extends object | object[]>(
  path: string,
  queryParams: {
    filters?: any;
    populate?: string[] | object | string;
  } = {},
  fetchOptions?: object,
): Promise<StrapiResponse<T>> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  if (!token)
    throw new Error('The Strapi API Token environment variable is not set.');
  const mergedOptions = {
    headers: { Authorization: `Bearer ${token}` },
    ...fetchOptions,
  };

  return await fetchAPI<T>(path, queryParams, mergedOptions);
}

// Individual resource getters

const globalFields = [
  'navbarLogo.image',
  'navbarLogo.darkImage',
  'footerLogo.image',
  'footerLogo.darkImage',
  'navbarLinks',
  'affiliateLogos.image',
  'affiliateLogos.darkImage',
];

export async function getGlobal(): Promise<
  StrapiResponse<IGlobal<(typeof globalFields)[number]>>
> {
  const queryParams = {
    populate: globalFields,
  };
  return requestData<IGlobal>('/global', queryParams);
}

const homePageFields = [
  'searchSection',
  'searchSection.buttons',
  'blurbs',
  'blurbs.tiles',
  'publishers',
  'publishers.partners',
  'publishers.publishers',
  'publishers.button',
];

export async function getHomePage(): Promise<
  StrapiResponse<IHome<(typeof homePageFields)[number]>>
> {
  const queryParams = {
    populate: homePageFields,
  };
  return requestData<IHome<(typeof homePageFields)[number]>>(
    '/home',
    queryParams,
  );
}

const blogPostFields: string[] | string = '*';

export async function getBlogPosts(
  category?: string,
): Promise<StrapiResponse<IBlog<(typeof blogPostFields)[number]>[]>> {
  const filters = category
    ? {
        category: {
          slug: category,
        },
      }
    : undefined;

  const queryParams = {
    sort: { createdAt: 'desc' },
    filters,
    populate: blogPostFields,
  };

  return requestData<IBlog<(typeof blogPostFields)[number]>[]>(
    '/blogs',
    queryParams,
  );
}

const weeknoteFields: string[] | string = '*';

export async function getWeeknotes(
  author?: string,
): Promise<StrapiResponse<IWeeknote<(typeof weeknoteFields)[number]>[]>> {
  const filters = author
    ? {
        author: {
          slug: author,
        },
      }
    : undefined;

  const queryParams = {
    sort: { createdAt: 'desc' },
    filters,
    populate: weeknoteFields,
  };

  return requestData<IWeeknote<(typeof weeknoteFields)[number]>[]>(
    '/weeknotes',
    queryParams,
  );
}

const toolsFields: string[] | string = '*';

export async function getTools(
  slug?: string,
): Promise<StrapiResponse<ITool<(typeof toolsFields)[number]>[]>> {
  const filters = slug
    ? {
        slug: slug,
      }
    : undefined;

  const queryParams = {
    sort: { order: 'asc' },
    filters,
    populate: toolsFields,
  };

  return requestData<ITool<(typeof toolsFields)[number]>[]>(
    '/tools',
    queryParams,
  );
}
