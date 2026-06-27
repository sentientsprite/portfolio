// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://github.com/sentientsprite',
  base: '/portfolio',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
