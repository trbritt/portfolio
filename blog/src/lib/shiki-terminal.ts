import type { ShikiTransformer } from 'shiki';
import type { Element, Root } from 'hast';

/**
 * Wraps every code block in terminal-window chrome: a title bar carrying the
 * language (or an explicit `title="..."`) and a copy button.
 *
 * Fenced-block options, parsed from the meta string:
 *
 *   ```rust title="src/lib.rs" showLineNumbers {4,9-12}
 *
 *   title=          label shown in the bar instead of the language name
 *   showLineNumbers line-number gutter, rendered with a CSS counter
 *   {4,9-12}        highlighted lines (handled by transformerMetaHighlight)
 */

/** Languages rendered as a shell session rather than as source. */
const SHELL_LANGS = new Set([
  'bash',
  'sh',
  'shell',
  'zsh',
  'fish',
  'console',
  'shellsession',
  'powershell',
  'ps1',
]);

/** Display names for the languages that actually show up in these posts. */
const LANG_LABELS: Record<string, string> = {
  rust: 'Rust',
  toml: 'TOML',
  console: 'terminal',
  shellsession: 'terminal',
  bash: 'bash',
  sh: 'sh',
  zsh: 'zsh',
  c: 'C',
  cpp: 'C++',
  python: 'Python',
  fortran: 'Fortran',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  js: 'JavaScript',
  javascript: 'JavaScript',
  json: 'JSON',
  yaml: 'YAML',
  sql: 'SQL',
  diff: 'diff',
  text: 'text',
  plaintext: 'text',
};

const TITLE_RE = /title="([^"]*)"/;

function el(tagName: string, properties: Element['properties'], children: Element['children'] = []): Element {
  return { type: 'element', tagName, properties, children };
}

export function transformerTerminalChrome(): ShikiTransformer {
  return {
    name: 'terminal-chrome',

    root(root: Root) {
      const preIndex = root.children.findIndex(
        (node): node is Element => node.type === 'element' && node.tagName === 'pre'
      );
      if (preIndex === -1) return;

      const pre = root.children[preIndex] as Element;
      const meta = this.options.meta?.__raw ?? '';
      const lang = (this.options.lang ?? 'text').toLowerCase();

      const title = TITLE_RE.exec(meta)?.[1];
      const showLineNumbers = /\bshowLineNumbers\b/.test(meta);
      const isShell = SHELL_LANGS.has(lang);
      const label = title ?? LANG_LABELS[lang] ?? lang;

      if (showLineNumbers) {
        pre.properties.class = `${pre.properties.class ?? ''} line-numbers`.trim();
      }

      // A shell session is output you read, not source you reuse; offering
      // "copy" on it would hand back the `$` prompts along with the commands.
      const copyable = !['console', 'shellsession'].includes(lang);

      const bar = el('figcaption', { class: 'code-block__bar' }, [
        el('span', { class: 'code-block__lang', 'data-shell': isShell ? '' : undefined }, [
          { type: 'text', value: label },
        ]),
        ...(copyable
          ? [
              el(
                'button',
                {
                  type: 'button',
                  class: 'code-block__copy',
                  'data-copy': '',
                  'aria-label': `Copy ${label} snippet to clipboard`,
                },
                [{ type: 'text', value: 'copy' }]
              ),
            ]
          : []),
      ]);

      root.children[preIndex] = el(
        'figure',
        {
          class: 'code-block',
          'data-lang': lang,
          'data-shell': isShell ? '' : undefined,
        },
        [bar, pre]
      );
    },
  };
}
