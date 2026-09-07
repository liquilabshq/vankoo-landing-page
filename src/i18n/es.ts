/**
 * The Spanish copy, and the shape every other language has to match.
 *
 * Spanish is written first and English is a translation of it, never the other
 * way round: the product is Peruvian, the invoice statuses have Spanish labels
 * that product owns, and a phrase like «tu liquidez, hoy» does not survive being
 * back-translated from English.
 *
 * Nothing here claims a number the project cannot back up. Vankoo has no
 * financed volume to boast about yet, so the page earns trust with what it
 * actually does — SUNAT validation, eleven invoice states, A/B/C scoring —
 * instead of invented figures.
 */
export const es = {
    meta: {
        title: 'Vankoo · Convierte tus facturas en liquidez hoy',
        description:
            'Crowdfactoring peruano: las MYPEs cobran hoy sus facturas por cobrar y los inversionistas financian operaciones validadas con SUNAT. Tu liquidez, hoy.',
        ogAlt: 'Vankoo, plataforma de crowdfactoring para MYPEs peruanas'
    },

    nav: {
        skipToContent: 'Saltar al contenido',
        howItWorks: 'Cómo funciona',
        forBusinesses: 'Para tu MYPE',
        forInvestors: 'Para invertir',
        faq: 'Preguntas',
        signIn: 'Ingresar',
        signUp: 'Crear cuenta',
        openMenu: 'Abrir el menú',
        closeMenu: 'Cerrar el menú',
        switchToEnglish: 'Cambiar a inglés',
        switchToDark: 'Cambiar al tema oscuro',
        switchToLight: 'Cambiar al tema claro'
    },

    hero: {
        titleLead: 'Tu factura ya vale.',
        titleAccent: 'Cóbrala hoy.',
        lead: 'Esa factura a 30, 60 o 90 días es dinero que ya ganaste. Vankoo la valida contra SUNAT, la publica en subasta y un grupo de inversionistas la financia. Tú recibes el efectivo ahora.',
        ctaPrimary: 'Adelanta tu factura',
        ctaSecondary: 'Quiero invertir',
        note: 'Adelantas lo que ya te deben.',
        demo: {
            label: 'Factura F001-4592',
            client: 'Minera Yanacocha S.A.',
            amount: 'S/ 8,200.00',
            advance: 'Recibes hoy',
            advanceAmount: 'S/ 7,970.40',
            caption: 'Ejemplo ilustrativo: 60 días, clasificación B.'
        }
    },

    /**
     * The five milestones of the invoice rail, and the eleven `InvoiceStatus`
     * values behind them. Both the grouping and the Spanish labels come from the
     * `Riel` component in the design system, so design, landing and the Invoicing
     * service all tell the same story.
     */
    pipeline: {
        title: 'Cinco hitos, y el sistema hace cuatro',
        lead: 'Cada factura recorre once estados internos agrupados en cinco hitos. El color dice quién trabaja en cada uno.',
        steps: [
            {
                name: 'Recibida',
                detail: 'Subes el XML o el PDF de tu factura. Queda registrada a tu nombre.',
                who: 'Tú'
            },
            {
                name: 'Leyendo datos',
                detail: 'El OCR extrae emisor, cliente, monto y vencimiento, y comprueba que todo cuadre entre sí.',
                who: 'El sistema'
            },
            {
                name: 'Validando con SUNAT',
                detail: 'Se contrasta el comprobante contra el registro oficial. Si no existe ahí, no entra.',
                who: 'El sistema'
            },
            {
                name: 'Aprobada',
                detail: 'Con el scoring de riesgo listo, la operación queda habilitada para financiarse.',
                who: 'El sistema'
            },
            {
                name: 'En subasta',
                detail: 'Los inversionistas la fondean por partes hasta completarla. Entonces recibes tu dinero.',
                who: 'Inversionistas'
            }
        ],
        sunatNote:
            'Una factura que no existe en el registro oficial de SUNAT no llega nunca a subasta. Es el primero de varios filtros.',
        exceptionsTitle: 'Y cuando algo no cuadra',
        exceptions: [
            {name: 'Requiere revisión', detail: 'Una persona mira el caso antes de que siga avanzando.'},
            {name: 'No elegible', detail: 'La factura no cumple los criterios. Te decimos por qué.'},
            {name: 'Rechazada', detail: 'La operación no sigue y no se te cobra nada.'}
        ]
    },

    /**
     * The discount, spelled out. The rates and the model live in
     * `src/lib/factoring.ts`, which documents where each number comes from; this
     * is only the language wrapped around them.
     *
     * `{amount}`, `{rate}`, `{days}`, `{cost}`, `{ticket}`, `{return}` and
     * `{tea}` are filled in twice: once at build time for the worked example that
     * ships in the HTML, and once by the script on every change. The placeholders
     * stay in the copy rather than in the component so a translator can move them
     * where the sentence needs them.
     */
    calculator: {
        title: '¿Cuánto cuesta adelantar tu factura?',
        lead: 'Mueve el monto, el plazo y la clasificación. La resta es la misma que verás dentro de la plataforma.',
        labels: {
            currency: 'Moneda',
            amount: 'Monto de la factura',
            term: 'Días hasta el vencimiento',
            grade: 'Clasificación de riesgo',
            youGet: 'Recibes hoy',
            invoice: 'Factura',
            cost: 'Costo del adelanto',
            monthlyRate: 'Tasa mensual',
            tcea: 'TCEA'
        },
        currencies: {PEN: 'Soles', USD: 'Dólares'},
        terms: {30: '30 días', 60: '60 días', 90: '90 días'},
        grades: {A: 'Bajo', B: 'Medio', C: 'Alto'},
        formula: '{amount} × {rate} × ({days} / 30) = {cost}',
        investor: 'Del otro lado: quien pone {ticket} en esta operación recibe {return} de más a los {days} días, un {tea} TEA.',
        cta: 'Adelanta tu factura',
        disclaimer:
            'Tasas de referencia del mercado peruano de factoring, entre 1.0 % y 1.8 % mensual. Vankoo todavía no publica las suyas.'
    },

    audiences: {
        title: 'Quien cobra y quien financia, en la misma plataforma',
        lead: 'La factura de una MYPE es la oportunidad de un inversionista. Vankoo es lo que hay en medio.',
        tabs: {business: 'Para tu MYPE', investor: 'Para invertir'},
        business: {
            title: 'Deja de financiar gratis a tus clientes',
            lead: 'El crédito comercial lo pagas tú: entregas hoy y cobras en tres meses. Vankoo cierra ese hueco.',
            points: [
                {
                    title: 'El efectivo entra esta semana',
                    detail: 'Adelantas la factura en cuanto queda aprobada y publicada, sin esperar al vencimiento.'
                },
                {
                    title: 'Sale de tus cuentas por cobrar',
                    detail: 'Cedes un derecho de cobro que ya figuraba en tu contabilidad. La deuda de tu balance queda igual.'
                },
                {
                    title: 'Cada factura, su propio caso',
                    detail: 'Subes una factura y se evalúa esa: quién la debe pagar y para cuándo.'
                },
                {
                    title: 'Sabes siempre dónde está',
                    detail: 'El mismo riel que ves aquí lo tienes dentro, factura por factura y en tiempo real.'
                }
            ],
            cta: 'Adelanta tu primera factura'
        },
        investor: {
            title: 'Rentabilidad con una factura detrás',
            lead: 'Detrás de cada operación hay un comprobante emitido, validado contra SUNAT y con fecha de pago.',
            points: [
                {
                    title: 'Plazos cortos y concretos',
                    detail: 'Cada operación vence cuando vence la factura: 30, 60 o 90 días.'
                },
                {
                    title: 'Riesgo con nombre y letra',
                    detail: 'Cada operación llega clasificada A, B o C. Eliges a qué te expones antes de poner un sol.'
                },
                {
                    title: 'Reparte lo que inviertes',
                    detail: 'Las operaciones se fondean por partes, así que puedes entrar en varias en lugar de en una sola.'
                },
                {
                    title: 'Soles o dólares',
                    detail: 'La billetera opera en PEN y USD, y cada movimiento queda registrado.'
                }
            ],
            cta: 'Explorar oportunidades'
        }
    },

    risk: {
        title: 'A, B o C, y qué significa cada una',
        lead: 'Un solo sistema de clasificación para toda la plataforma. La letra viaja con la operación desde que se aprueba hasta que se paga, y significa lo mismo en cada pantalla.',
        grades: [
            {
                grade: 'A',
                title: 'Riesgo bajo',
                detail: 'Deudor consolidado y comportamiento de pago limpio. La rentabilidad es la más contenida de las tres.'
            },
            {
                grade: 'B',
                title: 'Riesgo medio',
                detail: 'Historial correcto con algún matiz. El punto de equilibrio entre lo que rinde y lo que expone.'
            },
            {
                grade: 'C',
                title: 'Riesgo alto',
                detail: 'Menos historial o señales que piden atención. Mayor rendimiento esperado, y se dice con todas las letras.'
            }
        ],
        note: 'La clasificación describe la operación, no promete un resultado.'
    },

    /**
     * What used to be a four-card «Confianza» section of its own.
     *
     * Three of those four items were on every fintech landing page ever made,
     * and the fourth — the SUNAT check — belongs beside the milestone that
     * performs it, not in a grid two screens later. So the SUNAT line moved into
     * `pipeline.sunatNote` and what is left rides under the risk grades as a
     * single strip: supporting detail, rendered as supporting detail.
     */
    guarantees: {
        title: 'Y por debajo de todo esto',
        items: [
            {title: 'Identidad verificada', detail: 'Empresas por RUC y personas por DNI, antes de cobrar o invertir.'},
            {title: 'Billetera con trazabilidad', detail: 'Cada depósito y cada saldo asentados, en soles y en dólares.'},
            {title: 'Acceso protegido', detail: 'Sesiones firmadas, y tu rol decide lo que ves.'}
        ]
    },

    faq: {
        title: 'Lo que todo el mundo pregunta primero',
        items: [
            {
                question: '¿Qué es exactamente el crowdfactoring?',
                answer: 'Factoring de toda la vida, pero en lugar de financiarlo un banco lo financian varias personas a la vez. Tú cedes el derecho de cobro de una factura y recibes su importe adelantado; quienes ponen el dinero cobran cuando tu cliente paga.'
            },
            {
                question: '¿Cuánto recibo por mi factura?',
                answer: 'El importe de la factura menos un descuento que depende del plazo que falte hasta el vencimiento y de la clasificación de riesgo de la operación. Lo ves antes de aceptar, y si no te convence no sigue adelante.'
            },
            {
                question: '¿Qué pasa si mi cliente no paga?',
                answer: 'Es el riesgo que asume quien invierte, y por eso cada operación llega clasificada A, B o C antes de que nadie ponga un sol. Vankoo no oculta ese riesgo detrás de un promedio.'
            },
            {
                question: '¿Necesito una línea de crédito o garantías?',
                answer: 'No. Cada factura se evalúa por su cuenta: por quién la debe pagar y por cuándo. No hay línea que negociar ni bienes que poner en garantía.'
            },
            {
                question: '¿En qué monedas trabajan?',
                answer: 'Soles y dólares. La billetera lleva un saldo por moneda y los movimientos quedan separados.'
            },
            {
                question: '¿Cuánto tarda una factura en estar disponible?',
                answer: 'La lectura de datos y la validación con SUNAT son automáticas, así que el grueso del recorrido es cuestión de minutos. Lo que no es instantáneo es la subasta: depende de que los inversionistas completen el monto.'
            }
        ]
    },

    finalCta: {
        title: 'Tu liquidez, hoy.',
        lead: 'Sube tu primera factura o entra a ver qué operaciones hay abiertas. Crear la cuenta no cuesta nada.',
        ctaPrimary: 'Crear cuenta',
        ctaSecondary: 'Ya tengo cuenta'
    },

    footer: {
        tagline: 'Tu liquidez, hoy.',
        product: 'Producto',
        company: 'Vankoo',
        legal: 'Legal',
        links: {
            howItWorks: 'Cómo funciona',
            forBusinesses: 'Para tu MYPE',
            forInvestors: 'Para invertir',
            faq: 'Preguntas',
            terms: 'Términos',
            privacy: 'Privacidad',
            help: '¿Necesitas ayuda?'
        },
        academic:
            'Vankoo es un proyecto académico desarrollado por LiquiLabs. No presta servicios financieros reales ni capta fondos del público.',
        rights: 'LiquiLabs'
    },

    notFound: {
        title: 'Esta página no existe',
        lead: 'El enlace que seguiste no lleva a ninguna parte. La portada sí.',
        cta: 'Volver a la portada'
    }
};

/**
 * The contract every translation has to satisfy.
 *
 * Derived from the Spanish object rather than declared by hand, so adding a
 * string here is what makes `astro check` demand it in English too. Deliberately
 * without `as const`: literal types would make every translated string a type
 * error for not being the Spanish one.
 */
export type Copy = typeof es;
