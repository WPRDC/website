import { fetchAPI } from '@/app/lib/fetch-api';
import {
  IArtifact,
  IBlog,
  IGlobal,
  IHome,
  INavMenuItem,
  IPage,
  IProject,
  ITool,
  IWeeknote,
  StrapiResponse,
} from '@/app/types';
import { DEFAULT_PAGE_SIZE } from '@/app/lib/constants';
import { format } from 'logform';
import metadata = format.metadata;

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

export async function getContentByID<T extends object>(
  path: string,
  id: string,
  lang: string,
  populate?: string,
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const queryParams = { locale: lang, populate };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchAPI<T>(`${path}/${id}`, queryParams, options);
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
  'seo',
  'metadata',
  'favicon',
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
  'publishers.partners.partnerLogo',
  'publishers.publishers.partnerLogo',
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
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<StrapiResponse<IBlog<(typeof blogPostFields)[number]>[]>> {
  const pagination = {
    page,
    pageSize,
  };

  const queryParams = {
    sort: { publishDate: 'desc' },
    pagination,
    populate: blogPostFields,
  };

  return requestData<IBlog<(typeof blogPostFields)[number]>[]>(
    '/blogs',
    queryParams,
  );
}

const weeknoteFields: string[] | string = '*';

export async function getWeeknotes(
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<StrapiResponse<IWeeknote<(typeof weeknoteFields)[number]>[]>> {
  const pagination = {
    page,
    pageSize,
  };

  const queryParams = {
    sort: { publishDate: 'desc' },
    pagination,
    populate: blogPostFields,
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

const artifactFields: string[] | string = '*';

export async function getArtifacts(
  slug?: string,
): Promise<StrapiResponse<IArtifact<(typeof artifactFields)[number]>[]>> {
  const filters = slug
    ? {
        slug: slug,
      }
    : undefined;

  const queryParams = {
    sort: { order: 'asc' },
    filters,
    populate: artifactFields,
  };

  return requestData<IArtifact<(typeof artifactFields)[number]>[]>(
    '/artifacts',
    queryParams,
  );
}

const projectFields: string[] | string = '*';

export async function getProjects(
  slug?: string,
): Promise<StrapiResponse<IProject[]>> {
  const filters = slug
    ? {
        slug: slug,
      }
    : undefined;

  const queryParams = {
    sort: { order: 'asc' },
    filters,
    populate: projectFields,
  };

  return requestData<IProject<(typeof projectFields)[number]>[]>(
    '/projects',
    queryParams,
  );
}

const mainMenuFields: string[] | string = [
  'primaryLink',
  'defaultDescription',
  'subMenu.link',
  'subMenu.subItems',
];

export async function getMainMenu(): Promise<StrapiResponse<INavMenuItem[]>> {
  const queryParams = {
    sort: { order: 'asc' },
    populate: mainMenuFields,
  };

  return requestData<INavMenuItem<(typeof mainMenuFields)[number]>[]>(
    '/nav-menu-items',
    queryParams,
  );
}
