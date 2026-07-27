import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { transformerTerminalChrome } from './src/lib/shiki-terminal.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogs.tbritt.xyz',
  // The MDX integration inherits the `markdown` block below, so .md and .mdx
  // posts get identical math and highlighting treatment.
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      // Astro's own slug pass runs *after* user rehype plugins, so autolinking
      // would find no ids to link to. Slugging explicitly here fixes the order;
      // Astro's later pass is then a no-op since the ids already exist.
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        { behavior: 'wrap', properties: { class: 'heading-anchor' } },
      ],
      [rehypeKatex, { strict: false, throwOnError: false }],
    ],
    shikiConfig: {
      // Vitesse Dark's #121212 canvas is a hair off the portfolio's #111111,
      // and its muted green/teal identifiers sit naturally beside the #6ABC96
      // accent. global.css flattens the background onto the panel colour.
      theme: 'vitesse-dark',
      // Rust signatures and shell invocations are long; scrolling a block
      // horizontally keeps line structure intact where wrapping destroys it.
      wrap: false,
      langs: [],
      transformers: [
        // `{4,9-12}` after the fence, and `[!code word:Foo]` comments.
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
        // `// [!code ++]` / `[!code --]` / `[!code highlight]` / `[!code focus]`
        // / `[!code error]` / `[!code warning]` annotations.
        transformerNotationDiff({ matchAlgorithm: 'v3' }),
        transformerNotationHighlight({ matchAlgorithm: 'v3' }),
        transformerNotationFocus({ matchAlgorithm: 'v3' }),
        transformerNotationErrorLevel({ matchAlgorithm: 'v3' }),
        // Must run last: it wraps the finished <pre> in its window chrome.
        transformerTerminalChrome(),
      ],
    },
  },
  build: {
    // Emit /posts/slug/index.html so URLs stay extensionless without relying
    // on host-specific rewrite rules.
    format: 'directory',
  },
});
