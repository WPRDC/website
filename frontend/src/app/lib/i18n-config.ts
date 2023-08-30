
export type AvailableLocale = "en" | "es"


export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'es'] as AvailableLocale[],
} as const;

