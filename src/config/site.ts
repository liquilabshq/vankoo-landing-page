/**
 * The handful of values that change when Vankoo gets a real home on the internet.
 *
 * They live together because every one of them is a placeholder today, and a
 * placeholder that is easy to find is a placeholder that actually gets replaced.
 */

/**
 * Where this site will be served from.
 *
 * TODO: point at the real domain once there is one. Until then the canonical
 * links, the hreflang alternates and the sitemap all describe a host that does
 * not exist yet — harmless while the site is unpublished, wrong the moment it is.
 */
export const SITE_URL = 'https://www.vankoo.pe';

/**
 * Where the product itself lives.
 *
 * TODO: point at the deployed `vankoo-mype-web`. Every «Ingresar» and «Crear
 * cuenta» on the page resolves through here, so one edit moves all of them.
 * `#` keeps the buttons inert rather than sending someone to a 404.
 */
export const APP_URL = '#';

/** The two entry points the product offers, appended to {@link APP_URL}. */
export const APP_ROUTES = {
    signIn: APP_URL === '#' ? '#' : `${APP_URL}/sign-in`,
    signUp: APP_URL === '#' ? '#' : `${APP_URL}/sign-up`
} as const;

/** The languages the landing is published in. `es` is the default and has no prefix. */
export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
