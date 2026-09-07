/**
 * The arithmetic of an invoice discount, and the only place the rates live.
 *
 * Vankoo does not publish its own rates yet, so these are the Peruvian market's,
 * verified on 7 September 2026 rather than invented:
 *
 * - The average discount runs **1% to 1.5% monthly on the advanced amount**
 *   (Infobae, 18 March 2026, quoting Anka Capital), and the total haircut lands
 *   between 1% and 5% of the invoice depending on term and risk (Rextie, which
 *   publishes rates from 1.19% monthly). Advances reach 97-98% of face value.
 * - Investors on Peruvian platforms are offered **12% to 18% TEA** over terms of
 *   30 to 120 days (Finsmart, Prestamype).
 *
 * So `A | B | C` map to 1.0 / 1.4 / 1.8 percent monthly, all inside the verified
 * band, and to 12 / 15 / 18 percent TEA on the investor's side. The gap between
 * what the MYPE pays and what the investor earns is the platform's cut, and the
 * page says so out loud instead of inventing a «comisión de estructuración» that
 * no published source puts a number on.
 *
 * Every figure this module produces is illustrative and the page labels it as
 * such. When Vankoo sets real rates, this table is the one thing that changes.
 */

export const GRADES = ['A', 'B', 'C'] as const;
export type Grade = (typeof GRADES)[number];

export const TERMS = [30, 60, 90] as const;
export type Term = (typeof TERMS)[number];

export const CURRENCIES = ['PEN', 'USD'] as const;
export type Currency = (typeof CURRENCIES)[number];

/** Monthly discount rate applied to the invoice, by risk grade. */
export const MONTHLY_RATE: Record<Grade, number> = {
    A: 0.01,
    B: 0.014,
    C: 0.018
};

/** What the investor funding that operation is offered, annualised. */
export const INVESTOR_TEA: Record<Grade, number> = {
    A: 0.12,
    B: 0.15,
    C: 0.18
};

/**
 * The slider's range per currency, and where it starts.
 *
 * Two currencies because the wallet is bimonetaria, and an invoice denominated
 * in dollars is a different size of thing — the same numbers with a different
 * symbol in front would be a lie about the market.
 */
export const AMOUNTS: Record<Currency, {min: number; max: number; step: number; start: number}> = {
    // The step has to divide `start - min` exactly, or the browser snaps the
    // handle to the nearest valid stop on load and the interactive figure walks
    // away from both the worked example in the HTML and the hero's card.
    PEN: {min: 1_000, max: 200_000, step: 100, start: 8_200},
    USD: {min: 300, max: 50_000, step: 50, start: 2_200}
};

export const SYMBOL: Record<Currency, string> = {PEN: 'S/', USD: 'US$'};

/** The ticket the investor's line is quoted on, so the figure means something. */
export const INVESTOR_TICKET: Record<Currency, number> = {PEN: 1_000, USD: 250};

export interface Quote {
    /** Face value of the invoice. */
    amount: number;
    /** What the discount costs. */
    cost: number;
    /** What lands in the account today. */
    advance: number;
    /** The monthly rate that produced it. */
    monthlyRate: number;
    /** Annual effective cost of the operation, the number a borrower compares. */
    tcea: number;
    /** What one investor ticket returns over the same term. */
    investorReturn: number;
    investorTea: number;
}

/**
 * The whole model, in four lines.
 *
 * `cost = amount x monthly rate x (days / 30)` is how a monthly discount rate is
 * applied in Peru, and the TCEA is that cost compounded over a year against what
 * the client actually received — which is the denominator that makes a TCEA a
 * TCEA rather than a nominal rate.
 */
export function quote(amount: number, days: Term, grade: Grade, currency: Currency): Quote {
    const monthlyRate = MONTHLY_RATE[grade];
    const cost = amount * monthlyRate * (days / 30);
    const advance = amount - cost;
    const tcea = Math.pow(1 + cost / advance, 365 / days) - 1;

    const investorTea = INVESTOR_TEA[grade];
    const investorReturn = INVESTOR_TICKET[currency] * (Math.pow(1 + investorTea, days / 365) - 1);

    return {amount, cost, advance, monthlyRate, tcea, investorReturn, investorTea};
}

/**
 * Money, the way it is written in Peru: comma for thousands, point for decimals,
 * and the symbol ahead of the figure with a space.
 */
export function money(value: number, currency: Currency, decimals = 2): string {
    return `${SYMBOL[currency]} ${value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })}`;
}

/**
 * A rate.
 *
 * Peru writes numbers the way the United States does — comma for thousands,
 * point for decimals — so `es-PE` and `en-US` produce the same digits here and
 * only the space before the sign differs: «1.4 %» against «1.4%». Kept as two
 * locales anyway because that space is a real Spanish typographic convention,
 * and because a third language would need the split to already exist.
 */
export function percent(value: number, locale: NumberLocale, decimals = 1): string {
    const figure = (value * 100).toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
    return locale === 'es-PE' ? `${figure} %` : `${figure}%`;
}

export type NumberLocale = 'es-PE' | 'en-US';

/** Spanish is the product's first language, so it is also the default here. */
export const NUMBER_LOCALE: Record<string, NumberLocale> = {es: 'es-PE', en: 'en-US'};
