/**
 * Turns the Figma dump (vankoo-tokens.txt) into src/styles/tokens.css.
 *
 * Regenerate rather than hand-edit the stylesheet: every value in it is Figma's,
 * and the only judgement calls are the ones spelled out below.
 */
import {readFileSync, writeFileSync} from 'node:fs';

const source = process.argv[2];
const target = process.argv[3];

const lines = readFileSync(source, 'utf8').split('\n').filter((line) => line && !line.startsWith('#'));

/** Figma writes codeSyntax two ways — `var(--x)` in Primitives, bare `--x` in Theme. */
function cssName(codeSyntax) {
    if (!codeSyntax || codeSyntax === '-') return null;
    return codeSyntax.replace(/^var\(/, '').replace(/\)$/, '').trim();
}

function derivedName(figmaName) {
    return `--vk-${figmaName.replace(/\//g, '-')}`;
}

/**
 * Figma's style names, as CSS numbers.
 *
 * The variables hold `SemiBold`, which is a font-style name and means nothing to
 * `font-weight`. The five steps are all in use, so none of them can be dropped.
 */
const WEIGHTS = {Regular: '400', Medium: '500', SemiBold: '600', Bold: '700', ExtraBold: '800'};

/**
 * The font stacks.
 *
 * The variable package publishes under «Plus Jakarta Sans Variable», so the
 * static name has to stay in the stack behind it or a machine with the plain
 * family installed would miss it. The fallbacks matter more than usual here:
 * these are the two faces the whole page is set in.
 */
const FAMILIES = {
    'family/app': "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
    'family/display': "'Poppins', 'Plus Jakarta Sans Variable', ui-sans-serif, system-ui, sans-serif"
};

/**
 * The one rename this generator applies.
 *
 * In Figma `border/focus` names two different things: a 3 px stroke width in
 * Primitives and the focus-ring colour in Theme. Both carry the codeSyntax
 * `--vk-border-focus`, so flattening the collections declares the property
 * twice and the colour silently wins — the width just disappears. The widths
 * move to their own prefix. Worth fixing in Figma too, or the next generation
 * brings it back.
 */
const RENAMES = {
    '1. Primitives|border/hairline': '--vk-border-width-hairline',
    '1. Primitives|border/thick': '--vk-border-width-thick',
    '1. Primitives|border/focus': '--vk-border-width-focus'
};

/** Unitless by nature: weights are numbers, and a bare 0 needs no unit. */
function formatValue(figmaName, raw) {
    if (figmaName.startsWith('family/')) return FAMILIES[figmaName] ?? `'${raw}'`;
    if (figmaName.startsWith('weight/')) return WEIGHTS[raw] ?? raw;
    if (/^#[0-9A-F]{6,8}$/i.test(raw)) return raw;
    if (/^-?\d+(\.\d+)?$/.test(raw)) return raw === '0' ? '0' : `${raw}px`;
    return raw;
}

const rows = [];
const textStyles = [];
const effectStyles = [];

for (const line of lines) {
    const cells = line.split('|');
    if (cells[0] === 'V') {
        const [, collection, mode, figmaName, codeSyntax, value] = cells;
        const key = `${collection}|${figmaName}`;
        rows.push({
            collection,
            mode,
            figmaName,
            name: RENAMES[key] ?? cssName(codeSyntax) ?? derivedName(figmaName),
            value: formatValue(figmaName, value),
            derived: !cssName(codeSyntax) && !RENAMES[key]
        });
    } else if (cells[0] === 'T') {
        const [, name, family, style, size, lineHeight, tracking, textCase, decoration, bound] = cells;
        textStyles.push({name, family, style, size, lineHeight, tracking, textCase, decoration, bound});
    } else if (cells[0] === 'E') {
        effectStyles.push({name: cells[1], effects: cells[2]});
    }
}

/** `DROP_SHADOW x y blur spread #hex on` for each layer, in Figma's own order. */
function shadowCss(effects) {
    return effects
        .split(' , ')
        .map((effect) => {
            const [type, x, y, blur, spread, color, visible] = effect.split(' ');
            if (visible === 'off') return null;
            const inset = type === 'INNER_SHADOW' ? 'inset ' : '';
            return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
        })
        .filter(Boolean)
        .join(', ');
}

function block(filter, indent = '    ') {
    const seen = new Set();
    const out = [];
    for (const row of rows.filter(filter)) {
        if (seen.has(row.name)) continue;
        seen.add(row.name);
        out.push(`${indent}${row.name}: ${row.value};`);
    }
    return out.join('\n');
}

/** Figma variable name (`text/display/size`) to the CSS custom property it became. */
const byFigmaName = new Map(rows.map((row) => [row.figmaName, row.name]));

/**
 * A text style's metric, as the variable it is bound to rather than as a number.
 *
 * Every `Landing/*` style binds its size and line height to the density
 * collection, which is what makes the ramp shrink on a narrow viewport without
 * any component knowing about it. Emitting the resolved pixels instead would
 * freeze the page at desktop metrics — the headline would still say 56px on a
 * phone — so the binding is what gets written out, and the literal is only a
 * fallback for a style that has none.
 */
function boundOrLiteral(style, field, literal) {
    const match = (style.bound || '').split('+').find((pair) => pair.startsWith(`${field}=`));
    const figmaName = match ? match.slice(field.length + 1) : null;
    const cssVariable = figmaName ? byFigmaName.get(figmaName) : null;
    return cssVariable ? `var(${cssVariable})` : literal;
}

const landingType = textStyles
    .filter((style) => style.name.startsWith('Landing/'))
    .map((style) => {
        const slug = style.name.replace('Landing/', '').toLowerCase();
        const tracking = Number(style.tracking.replace('%', '')) / 100;
        return [
            `    --vk-landing-${slug}-family: ${boundOrLiteral(style, 'fontFamily', `'${style.family}'`)};`,
            `    --vk-landing-${slug}-weight: ${boundOrLiteral(style, 'fontStyle', WEIGHTS[style.style] ?? '400')};`,
            `    --vk-landing-${slug}-size: ${boundOrLiteral(style, 'fontSize', `${style.size}px`)};`,
            `    --vk-landing-${slug}-lh: ${boundOrLiteral(style, 'lineHeight', style.lineHeight)};`,
            // Tracking is set on the style itself, not bound to a variable, so
            // there is nothing to point at. Figma states it as a percentage of
            // the font size, which is exactly what `em` means.
            `    --vk-landing-${slug}-tracking: ${tracking}em;`,
            style.textCase === 'UPPER' ? `    --vk-landing-${slug}-case: uppercase;` : null
        ]
            .filter(Boolean)
            .join('\n');
    })
    .join('\n');

const css = `/* Vankoo design tokens.

   Generated from the Vankoo Design System Figma library (eYSuFRMURTT87GezMWFv6J)
   by scripts/generate-tokens.mjs. Regenerate it; do not hand-edit.

   Layout of the file, which mirrors how Figma is organised:
     :root                   primitives + the Light theme + the Desktop density
     .dark                   only what the Dark theme changes
     @media (width < 48rem)  only what the Mobile density changes

   One rename is applied on the way in. Figma gives both the 3 px focus stroke
   and the focus-ring colour the codeSyntax --vk-border-focus; flattened into one
   namespace the colour wins and the width vanishes without a word. The stroke
   widths are emitted as --vk-border-width-*. */

:root {
    color-scheme: light;

    /* ---- Primitives. Ramps and scales; components must not reach for these. ---- */
${block((row) => row.collection === '1. Primitives')}

    /* ---- Theme: light. Only these are overridden under .dark. ---- */
${block((row) => row.collection === '2. Theme' && row.mode === 'Light')}

    /* ---- Density: desktop. Only these are overridden on narrow viewports. ---- */
${block((row) => row.collection === '3. Density' && row.mode === 'Desktop')}

    /* ---- Elevation, from the three effect styles. ---- */
${effectStyles.map((style) => `    --vk-elevation-${style.name.split('/')[1]}: ${shadowCss(style.effects)};`).join('\n')}

    /* ---- Landing type, from the Landing/* text styles. ----
       Seven styles the product never uses, which is why they had no consumer in
       code until this page existed. Poppins carries the headlines, Plus Jakarta
       Sans the running text, and the tracking is Figma's: -2% on the hero, -1%
       on section headings, +10% on the eyebrow. */
${landingType}
}

.dark {
    color-scheme: dark;

${block((row) => row.collection === '2. Theme' && row.mode === 'Dark')}
}

/* The mobile density. It rides on the viewport rather than on a class because
   there is no way for someone to be on a phone and want desktop metrics. */
@media (width < 48rem) {
    :root {
${block((row) => row.collection === '3. Density' && row.mode === 'Mobile', '        ')}
    }
}
`;

writeFileSync(target, css);

const derivedNames = rows.filter((row) => row.derived).map((row) => `${row.figmaName} -> ${row.name}`);
console.log(`variables: ${new Set(rows.map((row) => row.name)).size}`);
console.log(`filas modo: ${rows.length}`);
console.log(`estilos de texto: ${textStyles.length} (Landing/*: ${textStyles.filter((s) => s.name.startsWith('Landing/')).length})`);
console.log(`elevacion: ${effectStyles.length}`);
console.log(`sin codeSyntax, nombre derivado: ${[...new Set(derivedNames)].join(', ') || 'ninguno'}`);
