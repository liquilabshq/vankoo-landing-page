// @ts-check
import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import {DEFAULT_LOCALE, LOCALES, SITE_URL} from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
    // Needed for canonical URLs, the hreflang alternates and the sitemap. It is a
    // placeholder — see src/config/site.ts.
    site: SITE_URL,

    i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: [...LOCALES],
        routing: {
            // Spanish is the product's language and gets the bare root: `/` is
            // Spanish, `/en/` is English. Prefixing both would mean the domain
            // itself redirects, which costs a hop on the page that matters most.
            prefixDefaultLocale: false
        }
    },

    integrations: [
        sitemap({
            i18n: {
                defaultLocale: DEFAULT_LOCALE,
                locales: {es: 'es-PE', en: 'en'}
            }
        })
    ],

    vite: {
        plugins: [tailwindcss()]
    }
});
