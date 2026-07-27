/**
 * Shared design language for tbritt.xyz and blogs.tbritt.xyz.
 *
 * Both Tailwind configs consume this as a preset, so the terminal palette,
 * type stack, and motion primitives only ever get defined once. Change a
 * colour here and both sites move together.
 */

/** @type {Partial<import('tailwindcss').Config>} */
module.exports = {
  theme: {
    extend: {
      colors: {
        terminal: {
          // Page background and the flat panel fills layered on top of it.
          bg: '#111111',
          panel: '#161616',
          raised: '#1c1c1c',
          // Borders: `line` is the workhorse (Tailwind gray-700), `edge` is
          // the brighter stroke used for the corner brackets.
          line: '#374151',
          edge: '#6b7280',
          // Foreground ramp, brightest first.
          text: '#e5e5e5',
          muted: '#9ca3af',
          dim: '#6b7280',
          // The one accent on the whole site.
          accent: '#6ABC96',
          accentDim: '#3f7a60',
        },
      },
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        // Long-form reading face. Only the blog uses this; the portfolio has
        // no prose long enough to need it.
        prose: [
          'IBM Plex Serif',
          'Iowan Old Style',
          'Charter',
          'Georgia',
          'serif',
        ],
      },
      animation: {
        loading: 'loading 2s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'terminal-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        loading: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
};
