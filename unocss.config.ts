import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss';

function ensureNumber<T>(n: any, onNaN: T): number | T {
    n = Number(n);
    if (isNaN(n)) {
        return onNaN;
    }
    return n;
}

function ensureInt<T>(n: any, base = 10, onNaN: T): number | T {
    n = parseInt(n, ensureNumber(base, 10) || 10);
    if (isNaN(n)) {
        return onNaN;
    }
    return n;
}

export default defineConfig({
    shortcuts: [
        ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ],
    variants: presetUno().variants,
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
            collections: {
                mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
                carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
            },
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'DM Sans',
                serif: 'DM Serif Display',
                mono: 'DM Mono',
            },
        }),
    ],
    rules: [
        [/^col-(\d+)$/, ([, d]) => ({ width: `${(100 / 12) * ensureInt(d, 10, 12)}%` })],
        [/^(\S+)-primary$/, ([, attribute]) => {
            let props = `${attribute}-color`;
            if (attribute === 'text') {
                props = 'color';
            }
            const style: { [key: string]: string } = {};
            style[props] = 'var(--primary-color)';
            return style;
        }],
        [/^(\S+)-success$/, ([, attribute]) => {
            let props = `${attribute}-color`;
            if (attribute === 'text') {
                props = 'color';
            }
            const style: { [key: string]: string } = {};
            style[props] = 'var(--success-500)';
            return style;
        }],
        [/^(\S+)-danger$/, ([, attribute]) => {
            let props = `${attribute}-color`;
            if (attribute === 'text') {
                props = 'color';
            }
            const style: { [key: string]: string } = {};
            style[props] = 'var(--danger-500)';
            return style;
        }],
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
    safelist: 'prose prose-sm m-auto text-left'.split(' '),
});
