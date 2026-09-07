import type {Copy} from './es';

/**
 * The English copy.
 *
 * A translation of `es.ts`, not a parallel draft — when the two disagree,
 * Spanish is right. Typed as {@link Copy} so a string added on the Spanish side
 * fails the type check here until it is translated, rather than silently
 * rendering in the wrong language.
 *
 * «MYPE» stays untranslated: it is the Peruvian legal category for a micro or
 * small business, and «SME» would name a different thing.
 */
export const en: Copy = {
    meta: {
        title: 'Vankoo · Turn your invoices into cash today',
        description:
            'Peruvian crowdfactoring: small businesses get paid today for their receivables, investors fund operations validated against SUNAT. Your liquidity, today.',
        ogAlt: 'Vankoo, a crowdfactoring platform for Peruvian small businesses'
    },

    nav: {
        skipToContent: 'Skip to content',
        howItWorks: 'How it works',
        forBusinesses: 'For your business',
        forInvestors: 'For investors',
        faq: 'Questions',
        signIn: 'Sign in',
        signUp: 'Create account',
        openMenu: 'Open the menu',
        closeMenu: 'Close the menu',
        switchToEnglish: 'Switch to Spanish',
        switchToDark: 'Switch to the dark theme',
        switchToLight: 'Switch to the light theme'
    },

    hero: {
        eyebrow: 'Peruvian crowdfactoring',
        titleLead: 'Your invoice is already worth something.',
        titleAccent: 'Get paid today.',
        lead: 'That invoice due in 30, 60 or 90 days is money you have already earned. Vankoo validates it against SUNAT, puts it up for auction and a group of investors funds it. You get the cash now.',
        ctaPrimary: 'Advance an invoice',
        ctaSecondary: 'I want to invest',
        note: 'You are advancing what you are already owed.',
        demo: {
            label: 'Invoice F001-4592',
            client: 'Minera Yanacocha S.A.',
            amount: 'S/ 8,200.00',
            advance: 'You receive today',
            advanceAmount: 'S/ 7,970.40',
            caption: 'An illustrative example of an invoice making the trip.'
        }
    },

    pipeline: {
        eyebrow: 'From invoice to cash',
        title: 'Five milestones, and the system handles four',
        lead: 'Every invoice runs through eleven internal states grouped into five milestones. The colour says who is working on each one.',
        steps: [
            {
                name: 'Received',
                detail: 'You upload the XML or the PDF. It is recorded under your name.',
                who: 'You'
            },
            {
                name: 'Reading the data',
                detail: 'OCR pulls out issuer, client, amount and due date, then checks that they agree with each other.',
                who: 'The system'
            },
            {
                name: 'Validating with SUNAT',
                detail: 'The document is checked against the official registry. If it is not there, it does not get in.',
                who: 'The system'
            },
            {
                name: 'Approved',
                detail: 'With the risk score in place, the operation is cleared for funding.',
                who: 'The system'
            },
            {
                name: 'On auction',
                detail: 'Investors fund it in parts until the amount is covered. That is when you get your money.',
                who: 'Investors'
            }
        ],
        sunatNote:
            'An invoice that does not exist in SUNAT’s official registry never reaches auction. It is the first of several filters.',
        exceptionsTitle: 'And when something does not add up',
        exceptions: [
            {name: 'Needs review', detail: 'A person looks at the case before it goes any further.'},
            {name: 'Not eligible', detail: 'The invoice does not meet the criteria. We tell you why.'},
            {name: 'Rejected', detail: 'The operation stops here and you are charged nothing.'}
        ]
    },

    /** See the Spanish file: the placeholders are filled in by the component. */
    calculator: {
        title: 'What does advancing your invoice cost?',
        lead: 'Move the amount, the term and the grade. The arithmetic is the one you will see inside the platform.',
        labels: {
            currency: 'Currency',
            amount: 'Invoice amount',
            term: 'Days to maturity',
            grade: 'Risk grade',
            youGet: 'You receive today',
            invoice: 'Invoice',
            cost: 'Cost of the advance',
            monthlyRate: 'Monthly rate',
            tcea: 'Annual effective cost'
        },
        currencies: {PEN: 'Soles', USD: 'Dollars'},
        terms: {30: '30 days', 60: '60 days', 90: '90 days'},
        grades: {A: 'Low', B: 'Medium', C: 'High'},
        formula: '{amount} × {rate} × ({days} / 30) = {cost}',
        investor: 'On the other side: whoever puts {ticket} into this operation receives {return} more after {days} days, a {tea} annual rate.',
        cta: 'Advance an invoice',
        disclaimer:
            'Reference rates from the Peruvian factoring market, between 1.0% and 1.8% monthly. Vankoo does not publish its own yet.'
    },

    audiences: {
        eyebrow: 'Two sides, one ledger',
        title: 'The business getting paid and the investor funding it, in one place',
        lead: "One business's invoice is another person's opportunity. Vankoo is what sits in between.",
        tabs: {business: 'For your business', investor: 'For investors'},
        business: {
            title: 'Stop financing your clients for free',
            lead: 'Trade credit comes out of your pocket: you deliver today and collect in three months. Vankoo closes that gap.',
            points: [
                {
                    title: 'The cash lands this week',
                    detail: 'You advance the invoice as soon as it is approved and published, without waiting for the due date.'
                },
                {
                    title: 'It comes out of your receivables',
                    detail: 'You assign a receivable your books already carried. The debt on your balance sheet stays where it was.'
                },
                {
                    title: 'Every invoice on its own merits',
                    detail: 'You upload one invoice and that one is assessed: who owes it, and by when.'
                },
                {
                    title: 'You always know where it is',
                    detail: 'The same rail you see here is inside the product, invoice by invoice and in real time.'
                }
            ],
            cta: 'Advance your first invoice'
        },
        investor: {
            title: 'Returns with an invoice behind them',
            lead: 'Behind every operation there is a document that was issued, validated against SUNAT and carries a payment date.',
            points: [
                {
                    title: 'Short, definite terms',
                    detail: 'Every operation matures when the invoice does: 30, 60 or 90 days.'
                },
                {
                    title: 'Risk stated plainly',
                    detail: 'Every operation arrives graded A, B or C. You choose your exposure before committing anything.'
                },
                {
                    title: 'Spread what you put in',
                    detail: 'Operations are funded in parts, so you can join several instead of betting on one.'
                },
                {
                    title: 'Soles or dollars',
                    detail: 'The wallet works in PEN and USD, and every movement is recorded.'
                }
            ],
            cta: 'Browse open operations'
        }
    },

    risk: {
        eyebrow: 'Risk scoring',
        title: 'A, B or C, and what each one means',
        lead: 'One grading system for the whole platform. The letter travels with the operation from approval to payment, and means the same thing on every screen.',
        grades: [
            {
                grade: 'A',
                title: 'Low risk',
                detail: 'An established payer with a clean record. The most modest return of the three.'
            },
            {
                grade: 'B',
                title: 'Medium risk',
                detail: 'A sound history with a caveat or two. The middle ground between what it pays and what it exposes.'
            },
            {
                grade: 'C',
                title: 'High risk',
                detail: 'Thinner history, or signals worth attention. A higher expected return, and we say so outright.'
            }
        ],
        note: 'A grade describes the operation. It does not promise an outcome.'
    },

    /** See the Spanish file for why the «Trust» section was dissolved. */
    guarantees: {
        title: 'And underneath all of it',
        items: [
            {title: 'Verified identity', detail: 'Companies by RUC and people by national ID, before collecting or investing.'},
            {title: 'A wallet you can audit', detail: 'Every deposit and balance recorded, in soles and in dollars.'},
            {title: 'Protected access', detail: 'Signed sessions, and your role decides what you see.'}
        ]
    },

    faq: {
        eyebrow: 'Questions',
        title: 'What everyone asks first',
        items: [
            {
                question: 'What exactly is crowdfactoring?',
                answer: 'Ordinary factoring, except that instead of one bank funding it, several people do. You assign the right to collect an invoice and receive its value up front; the people who put up the money are repaid when your client pays.'
            },
            {
                question: 'How much do I get for my invoice?',
                answer: 'The invoice amount minus a discount that depends on how long is left until the due date and on the risk grade of the operation. You see it before accepting, and if it does not convince you, nothing happens.'
            },
            {
                question: 'What if my client does not pay?',
                answer: 'That is the risk the investor takes, which is exactly why every operation is graded A, B or C before anyone commits a sol. Vankoo does not bury that risk under an average.'
            },
            {
                question: 'Do I need a credit line or collateral?',
                answer: 'No. Each invoice is assessed on its own: on who owes the money and on when. There is no line to negotiate and nothing to pledge.'
            },
            {
                question: 'Which currencies do you work in?',
                answer: 'Soles and dollars. The wallet keeps a balance per currency and the movements stay separate.'
            },
            {
                question: 'How long until an invoice is available?',
                answer: 'Reading the data and validating with SUNAT are automatic, so most of the trip takes minutes. What is not instant is the auction: it depends on investors covering the amount.'
            }
        ]
    },

    finalCta: {
        title: 'Your liquidity, today.',
        lead: 'Upload your first invoice, or come in and see which operations are open. Creating an account costs nothing.',
        ctaPrimary: 'Create account',
        ctaSecondary: 'I already have an account'
    },

    footer: {
        tagline: 'Your liquidity, today.',
        product: 'Product',
        company: 'Vankoo',
        legal: 'Legal',
        links: {
            howItWorks: 'How it works',
            forBusinesses: 'For your business',
            forInvestors: 'For investors',
            faq: 'Questions',
            terms: 'Terms',
            privacy: 'Privacy',
            help: 'Need help?'
        },
        academic:
            'Vankoo is an academic project built by LiquiLabs. It does not provide real financial services or take money from the public.',
        rights: 'LiquiLabs'
    },

    notFound: {
        title: 'This page does not exist',
        lead: 'The link you followed leads nowhere. The home page does.',
        cta: 'Back to the home page'
    }
};
