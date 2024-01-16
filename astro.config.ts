import type { AstroUserConfig } from 'astro';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
// import compress from 'astro-compress';

import svgr from 'vite-plugin-svgr';
import icons from 'unplugin-icons/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'astro/config';
// import node from '@astrojs/node';

import remarkToc from 'remark-toc';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import remarkGemoji from 'remark-gemoji';
import remarkMermaid from './plugins/remark/remark-mermaid';
import remarkAdmonition from './plugins/remark/remark-admonition';
import remarkSpoiler from './plugins/remark/remark-spoiler';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypePostExcerpt from './plugins/rehype/rehype-post-excerpt';
import rehypePostWordCount from './plugins/rehype/rehype-post-word-count';
import rehypePostReadingTime from './plugins/rehype/rehype-post-reading-time';
import rehypePostRaw from './plugins/rehype/rehype-post-raw';

import { remarkCodeHike } from '@code-hike/mdx';

import vitePluginUserConfig from './plugins/vite/vite-plugin-user-config';
import userConfig from './src/config';

// https://astro.build/config
const config: AstroUserConfig = {
  site: 'https://suborbit.net/',
  // base: 'blog',
  output: 'static',
  // adapter: node({
  //   mode: 'standalone'
  // }),
  integrations: [
    react(),
    tailwind(),
    mdx({
      remarkPlugins: [
        [remarkToc, { tight: true, ordered: true }],
        remarkMath,
        remarkGemoji,
        remarkDirective,
        remarkAdmonition,
        remarkSpoiler,
        remarkMermaid,
        // [remarkCodeHike, {
        //   lineNumbers: true,
        //   showCopyButton: true,
        //   theme: theme,
        //   skipLanguages: ['mermaid'],
        //   // staticMediaQuery: 'not screen, (max-width: 768px)',
        //   autoImport: false,
        // }],
      ]
    }),
    icon({
      include: {
        mingcute: ["*"],
        tabler: ["*"],
      },
    }),
    // compress({
    //   // avoid react hydration error
    //   // html: {
    //   //   collapseWhitespace: false,
    //   //   removeComments: false,
    //   // },
    //   html: false
    // }),
    sitemap(),
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
    remarkPlugins: [
      [remarkToc, { tight: true, ordered: true }],
      remarkMath,
      remarkGemoji,
      remarkDirective,
      remarkAdmonition,
      remarkSpoiler,
    ],
    rehypePlugins: [
      [rehypeRaw, { passThrough: ['comment'] }],
      rehypePostRaw,
      [rehypePostExcerpt, { limit: 220 }],
      rehypePostWordCount,
      rehypePostReadingTime,
      rehypeKatex,
    ],
  },
  // build: {
  //   assets: 'assets'
  // },
  // prefetch: {
  //   prefetchAll: true,
  // },
  vite: {
    plugins: [
      vitePluginUserConfig(userConfig),
      svgr(),
      icons({
        compiler: 'jsx',
        jsx: 'react',
        autoInstall: true
      }),
      visualizer({
        template: 'treemap'
      }),
    ],
    // resolve: {
    //   alias: {
    //     '@': '/src'
    //   }
    // },
    ssr: {
      noExternal: ['date-fns', 'react-use', '@radix-ui/*', 'domelementtype']
    },
  }
};

// https://astro.build/config
export default defineConfig(config);