const preset = require('../design/tailwind-preset.cjs');

const { colors } = preset.theme.extend;

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      typography: () => ({
        // The article body is the one place that breaks from the portfolio's
        // all-mono treatment: mono is unreadable over 2000 words. Chrome,
        // headings, code, and metadata stay mono, so the pages still read as
        // part of the same site.
        terminal: {
          css: {
            '--tw-prose-body': colors.terminal.text,
            '--tw-prose-headings': colors.terminal.text,
            '--tw-prose-links': colors.terminal.accent,
            '--tw-prose-bold': colors.terminal.text,
            '--tw-prose-counters': colors.terminal.accent,
            '--tw-prose-bullets': colors.terminal.accentDim,
            '--tw-prose-hr': colors.terminal.line,
            '--tw-prose-quotes': colors.terminal.muted,
            '--tw-prose-quote-borders': colors.terminal.accentDim,
            '--tw-prose-captions': colors.terminal.dim,
            '--tw-prose-code': colors.terminal.text,
            '--tw-prose-th-borders': colors.terminal.line,
            '--tw-prose-td-borders': colors.terminal.line,

            fontSize: '1.0625rem',
            lineHeight: '1.75',
            maxWidth: '68ch',

            // Mono for every structural element.
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: 'theme(fontFamily.mono)',
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            h2: { fontSize: '1.35rem', marginTop: '2.75em' },
            h3: { fontSize: '1.1rem', marginTop: '2em' },

            a: {
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              transition: 'color 150ms ease',
            },
            'a:hover': { color: colors.terminal.text },

            code: {
              fontFamily: 'theme(fontFamily.mono)',
              fontWeight: '400',
              fontSize: '0.875em',
              backgroundColor: colors.terminal.raised,
              border: `1px solid ${colors.terminal.line}`,
              padding: '0.1em 0.35em',
            },
            // Tailwind Typography wraps inline code in backticks by default.
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            // Only the type scale lives here; the frame, gutter, and title bar
            // are owned by `.code-block` in global.css.
            pre: {
              fontFamily: 'theme(fontFamily.mono)',
              fontSize: '0.85rem',
              // Much tighter than the 1.75 body measure on purpose: code is
              // scanned vertically in blocks, and prose leading makes a listing
              // feel airy and disconnected.
              lineHeight: '1.0',
              borderRadius: '0',
              padding: '0',
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
              fontSize: 'inherit',
            },

            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '2px',
              paddingLeft: '1.25em',
            },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },

            'thead th, tbody td': {
              fontFamily: 'theme(fontFamily.mono)',
              fontSize: '0.85rem',
            },

            hr: { borderTopStyle: 'dashed', marginTop: '3em', marginBottom: '3em' },

            figcaption: {
              fontFamily: 'theme(fontFamily.mono)',
              fontSize: '0.75rem',
              textAlign: 'center',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
