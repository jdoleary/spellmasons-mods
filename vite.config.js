import { defineConfig } from 'vite';
import path from 'path';
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ command, mode }) => ({
    build: {
        minify:false,
        lib: {
            entry: 'index.ts',
            formats:['cjs'],
            name: 'SpellmasonsMods',
            fileName: (format) => `SpellmasonsMods.${format}.js`,
        },
        chunkSizeWarningLimit: 1000000,
        outDir: 'build',
        assetsDir: '.',
        
    },
    base: '',
}));