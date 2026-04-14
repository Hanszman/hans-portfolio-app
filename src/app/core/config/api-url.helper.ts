const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

const trimLeadingSlash = (value: string): string => value.replace(/^\/+/, '');

export const buildApiUrl = (baseUrl: string, path: string): string =>
  `${trimTrailingSlash(baseUrl)}/${trimLeadingSlash(path)}`;
