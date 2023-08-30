export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337'
  }${path}`;
}

/**
 * Returns URL from the provided path or url
 *
 * @param {string} [pathOrURL]
 */
export function getStrapiMedia(pathOrURL: string | null) {
  // If null or a URL, there's no need to modify.
  if (
    pathOrURL == null ||
    pathOrURL.startsWith('http') ||
    pathOrURL.startsWith('//')
  ) {
    return pathOrURL;
  }
  // Otherwise prepend the strapi URL to the path.
  return `${getStrapiURL()}${pathOrURL}`;
}

/**
 * Formats date with our default format.
 * @param dateString
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}
