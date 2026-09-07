import {DEFAULT_LOCALE, LOCALES, type Locale} from '../config/site';
import {es, type Copy} from './es';
import {en} from './en';

const copy: Record<Locale, Copy> = {es, en};

/** The copy for a locale. Falls back to Spanish, which is the one that always exists. */
export function useCopy(locale: Locale | string | undefined): Copy {
    return copy[normalizeLocale(locale)];
}

/** Narrows whatever the router hands over — a string, or nothing at all — to a locale. */
export function normalizeLocale(locale: Locale | string | undefined): Locale {
    return LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;
}

/**
 * Prefixes a path with its locale.
 *
 * Spanish is served from the root and English from `/en/`, matching
 * `prefixDefaultLocale: false` in the Astro config. Every internal link goes
 * through here so that adding a third language is a change in one place.
 */
export function localePath(locale: Locale | string | undefined, path = '/'): string {
    const normalized = normalizeLocale(locale);
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (normalized === DEFAULT_LOCALE) return clean;
    return clean === '/' ? `/${normalized}/` : `/${normalized}${clean}`;
}

/** The other language, for the switch in the header. There are only two. */
export function otherLocale(locale: Locale | string | undefined): Locale {
    return normalizeLocale(locale) === 'es' ? 'en' : 'es';
}

/** What `<html lang>` should say. Spanish is Peruvian Spanish; English is unqualified. */
export function htmlLang(locale: Locale | string | undefined): string {
    return normalizeLocale(locale) === 'es' ? 'es-PE' : 'en';
}
